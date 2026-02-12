import Groq from "groq-sdk";
import hackathonData from '../config/hackathon-data.json';

// Lazy initialization - create client when first needed
let groq: Groq | null = null;

function getGroqClient(): Groq {
  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || '',
    });
  }
  return groq;
}

// Simple rate limiting - max 1 request per user every 5 seconds
const userCooldowns = new Map<string, number>();
const COOLDOWN_MS = 5000; // 5 seconds

export async function askLLM(userQuery: string, userId?: string): Promise<string> {
  // Check rate limit per user
  if (userId) {
    const now = Date.now();
    const lastRequest = userCooldowns.get(userId);
    
    if (lastRequest && (now - lastRequest) < COOLDOWN_MS) {
      const waitTime = Math.ceil((COOLDOWN_MS - (now - lastRequest)) / 1000);
      return `⏱️ Please wait ${waitTime} seconds before asking another question!`;
    }
    
    userCooldowns.set(userId, now);
    
    // Cleanup old entries (prevent memory leak)
    if (userCooldowns.size > 1000) {
      const oldestKey = userCooldowns.keys().next().value;
      if (oldestKey) userCooldowns.delete(oldestKey);
    }
  }

  try {
    const systemPrompt = `You are the official HackOverflow 4.0 Discord bot assistant. You help participants with questions about the hackathon.

HACKATHON INFORMATION:
${JSON.stringify(hackathonData, null, 2)}

INSTRUCTIONS:
- Be friendly, helpful, and enthusiastic about the hackathon
- Answer questions accurately based on the provided hackathon data above
- If you don't have specific information, say so and suggest contacting the team at hackoverflow@mes.ac.in
- Keep responses concise and clear (ideally under 300 words)
- Use emojis occasionally to be engaging but don't overdo it
- If asked about registration, remind them the deadline is January 31
- If asked about the theme, mention it will be announced soon
- Encourage participation and highlight the ₹100,000+ prize pool and learning opportunities
- Be supportive of beginners and emphasize that all skill levels are welcome`;

    const client = getGroqClient();
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = chatCompletion.choices[0]?.message?.content || '';
    
    if (!response) {
      return 'Sorry, I could not generate a response. Please try again!';
    }

    return response.trim();
  } catch (error: any) {
    console.error('❌ Error calling Groq:', error);
    
    // Handle rate limit errors
    if (error?.status === 429) {
      return '⚠️ Too many requests! Please wait a moment and try again.';
    }
    
    if (error?.status === 401) {
      console.error('⚠️ Invalid Groq API key!');
      return '⚠️ AI service configuration error. Please contact hackoverflow@mes.ac.in';
    }
    
    return '⚠️ The AI service is currently unavailable. Please try again in a moment.';
  }
}

// Health check function
export async function checkGroqHealth(): Promise<boolean> {
  try {
    if (!process.env.GROQ_API_KEY) {
      return false;
    }
    
    const client = getGroqClient();
    // Simple check - try to create a completion
    await client.chat.completions.create({
      messages: [{ role: "user", content: "test" }],
      model: "llama-3.3-70b-versatile",
      max_tokens: 1,
    });
    
    return true;
  } catch (error) {
    console.error('Groq health check failed:', error);
    return false;
  }
}
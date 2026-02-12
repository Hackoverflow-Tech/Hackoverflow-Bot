import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Checking Environment Configuration...\n');

// Check Discord Bot Token
const discordToken = process.env.DISCORD_BOT_TOKEN;
if (discordToken) {
  console.log('✅ DISCORD_BOT_TOKEN is set');
  console.log(`   Length: ${discordToken.length} characters`);
} else {
  console.log('❌ DISCORD_BOT_TOKEN is NOT set');
}

// Check Groq API Key
const groqKey = process.env.GROQ_API_KEY;
if (groqKey) {
  console.log('✅ GROQ_API_KEY is set');
  console.log(`   Length: ${groqKey.length} characters`);
} else {
  console.log('❌ GROQ_API_KEY is NOT set');
}

// Check optional channel ID
const channelId = process.env.ANNOUNCEMENTS_CHANNEL_ID;
if (channelId) {
  console.log('✅ ANNOUNCEMENTS_CHANNEL_ID is set');
} else {
  console.log('⚠️  ANNOUNCEMENTS_CHANNEL_ID is NOT set (optional)');
}

// Check Node environment
const nodeEnv = process.env.NODE_ENV || 'development';
console.log(`\n📦 NODE_ENV: ${nodeEnv}`);

console.log('\n════════════════════════════════════════');
console.log('Environment check complete!');
console.log('════════════════════════════════════════\n');

if (!discordToken || !groqKey) {
  console.log('⚠️  Missing required environment variables!');
  console.log('   Please set the following in your .env file:');
  if (!discordToken) console.log('   - DISCORD_BOT_TOKEN');
  if (!groqKey) console.log('   - GROQ_API_KEY');
  process.exit(1);
}

console.log('✅ All required environment variables are set!');
console.log('You can now run: npm run dev\n');
# 🤖 HackOverflow 4.0 Discord Bot

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-000000?style=for-the-badge&logo=groq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**AI-powered Discord bot for HackOverflow 4.0 - Your 24/7 hackathon assistant**

[Features](#-features) • [Quick Start](#-quick-start) • [Commands](#-commands) • [Deployment](#-deployment) • [Development](#-development)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Commands](#-commands)
- [AI Capabilities](#-ai-capabilities)
- [Scheduled Messages](#-scheduled-messages)
- [Deployment](#-deployment)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

HackOverflow Bot is an intelligent Discord assistant built for the HackOverflow 4.0 hackathon. It combines Discord.js with Groq's free AI API to provide instant answers about the event, schedule automated announcements, and assist participants 24/7.

**Event Details:**
- 📅 March 11-13, 2026 (36 hours)
- 📍 PHCET Campus, Rasayani, Maharashtra
- 💰 ₹100,000+ Prize Pool
- 👥 250+ Expected Participants

---

## ✨ Features

### 🤖 AI-Powered Q&A
- Natural language understanding using Groq's LLaMA 3.3 70B model
- Instant answers about hackathon details, registration, schedule, and more
- Context-aware responses with hackathon data
- Built-in rate limiting (1 query per 5 seconds per user)

### 📝 Slash Commands
- `/help` - Complete bot guide
- `/schedule` - 3-day event timeline
- `/faq` - Frequently asked questions
- `/team` - Meet the organizing team
- `/register` - Registration information
- `/stats` - Event statistics
- `/about` - About HackOverflow 4.0

### ⏰ Automated Scheduling
- Daily morning reminders (9:00 AM)
- Weekly updates (Mondays 10:00 AM)
- Registration deadline warnings (7 days before, final day)
- Event day announcements
- All customizable via cron expressions

### 🎨 Beautiful Discord Embeds
- Color-coded messages
- Rich formatting
- Event branding
- Organized information display

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe development |
| **Discord.js v14** | Discord API interaction |
| **Groq SDK** | Free AI completions |
| **Node-cron** | Scheduled messages |
| **Docker** | Containerization |
| **Coolify** | Self-hosted deployment |

---

## 📦 Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** or **yarn**
- **Discord Bot Token** ([Get one here](https://discord.com/developers/applications))
- **Groq API Key** ([Free signup](https://console.groq.com))
- **Docker** (optional, for deployment)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/hackoverflow-bot.git
cd hackoverflow-bot
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
```bash
cp .env.example .env
nano .env
```

Add your credentials:
```env
DISCORD_BOT_TOKEN=your_discord_bot_token_here
GROQ_API_KEY=your_groq_api_key_here
ANNOUNCEMENTS_CHANNEL_ID=your_channel_id (optional)
NODE_ENV=development
```

### 4️⃣ Build and Run
```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm start
```

### 5️⃣ Invite Bot to Your Server

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application → OAuth2 → URL Generator
3. Select scopes: `bot`, `applications.commands`
4. Select permissions: `Send Messages`, `Embed Links`, `Read Message History`
5. Copy the generated URL and open in browser
6. Select your server and authorize

---

## ⚙️ Configuration

### Getting Your Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" → Name it "HackOverflow Bot"
3. Go to **Bot** tab → Click "Reset Token" → Copy token
4. Enable these **Privileged Gateway Intents**:
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent
5. Save changes

### Getting Your Groq API Key (FREE!)

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (it's free!)
3. Go to API Keys section
4. Create new API key → Copy it
5. Paste in your `.env` file

**Groq Free Tier:**
- ✅ 30 requests/minute
- ✅ 14,400 requests/day
- ✅ No credit card required
- ✅ Unlimited usage

### Getting Channel ID (Optional)

For scheduled announcements:

1. Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
2. Right-click the announcements channel
3. Click "Copy Channel ID"
4. Paste in `ANNOUNCEMENTS_CHANNEL_ID`

---

## 💬 Commands

### Prefix Commands (Using `/`)

| Command | Description | Example |
|---------|-------------|---------|
| `/help` | Show all commands and features | `/help` |
| `/schedule` | View 3-day event timeline | `/schedule` |
| `/faq` | Common questions and answers | `/faq` |
| `/team` | Meet organizing team | `/team` |
| `/register` | Registration details | `/register` |
| `/stats` | Event statistics | `/stats` |
| `/about` | About HackOverflow 4.0 | `/about` |

### AI Mention Commands

Mention the bot and ask anything:
```
@HackOverflow Bot when is the hackathon?
@HackOverflow Bot how do I register?
@HackOverflow Bot what's the prize pool?
@HackOverflow Bot can beginners participate?
```

**Rate Limit:** 1 question per 5 seconds per user

---

## 🧠 AI Capabilities

The bot uses **Groq's LLaMA 3.3 70B** model with:

- **Contextual Understanding:** Knows all hackathon details
- **Smart Responses:** Answers based on official event data
- **Friendly Tone:** Encouraging and enthusiastic
- **Fallback Handling:** Suggests contacting team if unsure

### Example Interactions
```
User: @HackOverflow Bot What food is provided?
Bot: 🍕 Great question! We've got you covered with lunch and dinner 
     throughout the event! Check the schedule for exact meal times. 
     Day 1 lunch is at 1:00 PM, dinner at 9:00 PM. 
     Stay fueled for 36 hours of coding! 🚀

User: @HackOverflow Bot Can I participate solo?
Bot: Teams typically consist of 2-4 members for HackOverflow 4.0! 
     While solo participation might be possible, we encourage forming 
     a team for the best experience. Check the official guidelines or 
     contact hackoverflow@mes.ac.in for clarification! 💪
```

---

## ⏰ Scheduled Messages

Automatic announcements sent to configured channel:

| Schedule | Time | Message |
|----------|------|---------|
| Daily | 9:00 AM | Morning reminder about event |
| Weekly | Monday 10:00 AM | Weekly update |
| 7 days before | 6:00 PM | Registration deadline warning |
| Registration deadline | 9:00 AM, 6:00 PM | Final day reminders |
| Day before event | 6:00 PM | Event prep reminder |
| Event day | 8:00 AM | Event kickoff announcement |

### Customizing Schedules

Edit `src/utils/scheduler.ts`:
```typescript
{
  cronExpression: '0 9 * * *', // Every day at 9 AM
  channelId: process.env.ANNOUNCEMENTS_CHANNEL_ID || '',
  description: 'Daily morning reminder',
  message: () => { /* Your custom embed */ }
}
```

**Cron Syntax:**
```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of week (0-7)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

---

## 🚀 Deployment

### Option 1: Local Deployment
```bash
# Build
npm run build

# Run with PM2 (recommended)
npm install -g pm2
pm2 start dist/index.js --name hackoverflow-bot
pm2 save
pm2 startup
```

### Option 2: Docker Deployment
```bash
# Build image
docker build -t hackoverflow-bot .

# Run container
docker run -d \
  --name hackoverflow-bot \
  --env-file .env \
  --restart unless-stopped \
  hackoverflow-bot
```

### Option 3: Docker Compose
```bash
# Start
docker-compose up -d

# View logs
docker-compose logs -f hackoverflow-bot

# Stop
docker-compose down
```

### Option 4: Coolify (Self-Hosted)

1. **Push to GitHub:**
```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
```

2. **In Coolify Dashboard:**
   - New Resource → Docker Compose
   - Connect GitHub repository
   - Set compose file: `docker-compose.coolify.yml`

3. **Add Environment Variables:**
```
   DISCORD_BOT_TOKEN=your_token
   GROQ_API_KEY=your_groq_key
   ANNOUNCEMENTS_CHANNEL_ID=your_channel_id
   NODE_ENV=production
```

4. **Deploy!**
   - Coolify will build and start the bot
   - Check logs for successful startup

---

## 🛠️ Development

### Project Setup
```bash
# Install dependencies
npm install

# Run tests
npm run test:env

# Development mode (hot reload)
npm run dev

# Build TypeScript
npm run build

# Watch mode
npm run watch
```

### Code Structure
```
hackoverflow-bot/
├── src/
│   ├── config/
│   │   └── hackathon-data.json    # Event data for AI context
│   ├── utils/
│   │   ├── llm.ts                 # Groq AI integration
│   │   └── scheduler.ts           # Cron job scheduling
│   ├── index.ts                   # Main bot logic
│   └── test-env.ts                # Environment validator
├── .env                           # Your secrets (gitignored)
├── .env.example                   # Template
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### Adding New Commands

Edit `src/index.ts`:
```typescript
async function handleYourCommand(message: Message): Promise<void> {
  const embed = new EmbedBuilder()
    .setColor('#FF6B35')
    .setTitle('Your Command Title')
    .setDescription('Your description')
    .addFields(
      { name: 'Field 1', value: 'Value 1' }
    );
  
  await message.reply({ embeds: [embed] });
}

// Add to switch statement
case '/yourcommand':
  await handleYourCommand(message);
  break;
```

### Updating Hackathon Data

Edit `src/config/hackathon-data.json`:
```json
{
  "name": "HackOverflow 4.0",
  "dates": {
    "event_start": "March 11, 2026",
    "event_end": "March 13, 2026"
  },
  "statistics": {
    "prize_pool": "₹100,000+"
  }
}
```

---

## 📁 Project Structure
```
hackoverflow-bot/
├── src/
│   ├── config/
│   │   └── hackathon-data.json          # Hackathon details
│   ├── utils/
│   │   ├── llm.ts                       # Groq AI + rate limiting
│   │   └── scheduler.ts                 # Cron jobs
│   ├── index.ts                         # Main bot
│   └── test-env.ts                      # Env checker
├── dist/                                # Compiled JS
├── node_modules/                        # Dependencies
├── .env                                 # Secrets (not in git)
├── .env.example                         # Template
├── .gitignore                           # Git exclusions
├── .dockerignore                        # Docker exclusions
├── Dockerfile                           # Container config
├── docker-compose.yml                   # Local deployment
├── docker-compose.coolify.yml           # Coolify deployment
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── README.md                            # This file
├── QUICKSTART.md                        # Fast setup guide
├── DEPLOYMENT.md                        # Deployment guide
└── CONTRIBUTING.md                      # Contribution guide
```

---

## 🐛 Troubleshooting

### Bot is Offline
```bash
# Check if bot is running
ps aux | grep node

# Check logs
npm run dev
# or
docker-compose logs -f hackoverflow-bot
```

### "Invalid Token" Error

- Double-check `DISCORD_BOT_TOKEN` in `.env`
- Make sure there are no extra spaces
- Regenerate token if needed

### Groq API Errors

**401 Unauthorized:**
- Check `GROQ_API_KEY` is correct
- Verify at [console.groq.com](https://console.groq.com)

**429 Rate Limited:**
- Wait 1 minute and try again
- Users are rate-limited to 1 query per 5 seconds
- Groq free tier: 30 req/min

### Bot Doesn't Respond to Mentions

- Verify bot has `Message Content Intent` enabled
- Check bot has permissions in channel:
  - Send Messages
  - Embed Links
  - Read Message History

### Scheduled Messages Not Sending

- Set `ANNOUNCEMENTS_CHANNEL_ID` in `.env`
- Verify bot has permissions in that channel
- Check cron expressions in `src/utils/scheduler.ts`

### TypeScript Errors
```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📊 Monitoring & Logs

### View Logs

**Development:**
```bash
npm run dev
# Logs appear in console
```

**Docker:**
```bash
docker-compose logs -f hackoverflow-bot
```

**PM2:**
```bash
pm2 logs hackoverflow-bot
```

### Health Checks

The bot includes automatic health checks:

- ✅ Discord connection
- ✅ Groq API status
- ✅ Environment variables

---

## 🔐 Security

**Never commit:**
- `.env` file
- API keys
- Bot tokens
- Channel IDs

**Best Practices:**
- Rotate tokens regularly
- Use environment variables
- Enable 2FA on Discord account
- Monitor bot activity

---

## 📈 Performance

**Resource Usage:**
- RAM: ~100-150 MB
- CPU: Minimal (<1% idle)
- Network: ~1-5 MB/day (depends on usage)

**Groq API Limits (Free Tier):**
- 30 requests/minute
- 14,400 requests/day
- Perfect for 15-50 active users

---

## 🎓 Learn More

- [Discord.js Guide](https://discordjs.guide/)
- [Groq Documentation](https://console.groq.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Docker Docs](https://docs.docker.com/)
- [Coolify Docs](https://coolify.io/docs)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Team

**HackOverflow 4.0**
- **Event Leads:** Darin Peringalloor, Sampriti Dogra
- **Faculty Coordinators:** Prof. Rutvij Mane, Dr. Rajashree Gadhave, Prof. Pradnya Patil

**Bot Development:**
- Built with ❤️ for HackOverflow 4.0

---

## 📞 Support

- **Email:** hackoverflow@mes.ac.in
- **Discord:** Mention `@HackOverflow Bot` in server
- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/hackoverflow-bot/issues)

---

## 🎉 Acknowledgments

- [Discord.js](https://discord.js.org/) - Discord API wrapper
- [Groq](https://groq.com/) - Free AI completions
- [Anthropic Claude](https://claude.ai/) - Development assistance
- [PHCET](https://www.mes.ac.in/phcet) - Event organizers

---

<div align="center">

</div>
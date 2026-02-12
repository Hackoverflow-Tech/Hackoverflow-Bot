import cron from 'node-cron';
import { Client, TextChannel, EmbedBuilder } from 'discord.js';
import hackathonData from '../config/hackathon-data.json';

interface ScheduledMessage {
  cronExpression: string;
  channelId: string;
  message: string | (() => EmbedBuilder);
  description: string;
}

// Define your scheduled messages here - now using data from JSON!
const scheduledMessages: ScheduledMessage[] = [
  // Daily reminder at 9 AM
  {
    cronExpression: '0 9 * * *',
    channelId: process.env.ANNOUNCEMENTS_CHANNEL_ID || '',
    description: 'Daily morning reminder',
    message: () => {
      const { name, dates, statistics } = hackathonData;
      return new EmbedBuilder()
        .setColor('#FF6B35')
        .setTitle('🌅 Good Morning, Hackers!')
        .setDescription(`${name} is coming soon! Have you registered yet?`)
        .addFields(
          { name: '📅 Event Dates', value: `${dates.event_start} - ${dates.event_end}`, inline: true },
          { name: '⏰ Registration Deadline', value: dates.registration_end, inline: true },
          { name: '💰 Prize Pool', value: statistics.prize_pool, inline: true }
        )
        .setFooter({ text: 'Register now!' })
        .setTimestamp();
    },
  },
  // Weekly reminder on Monday at 10 AM
  {
    cronExpression: '0 10 * * 1',
    channelId: process.env.ANNOUNCEMENTS_CHANNEL_ID || '',
    description: 'Weekly Monday reminder',
    message: () => {
      const { name, statistics, contact } = hackathonData;
      return new EmbedBuilder()
        .setColor('#4ECDC4')
        .setTitle(`🚀 Week Reminder: ${name}`)
        .setDescription('Don\'t miss out on India\'s premier student hackathon!')
        .addFields(
          { name: '✨ What to expect', value: `${hackathonData.dates.duration_hours} hours of coding, networking, and innovation` },
          { name: '🏆 Prize Pool', value: `${statistics.prize_pool} up for grabs` },
          { name: '🤝 Networking', value: `Connect with ${statistics.expected_hackers} hackers from ${statistics.previous_stats.colleges} colleges` },
          { name: '📧 Questions?', value: `Email us at ${contact.email}` }
        )
        .setTimestamp();
    },
  },
  // Registration reminder 7 days before deadline (Jan 24 at 6 PM)
  {
    cronExpression: '0 18 24 1 *',
    channelId: process.env.ANNOUNCEMENTS_CHANNEL_ID || '',
    description: 'Registration deadline - 7 days warning',
    message: () => {
      const { name, dates } = hackathonData;
      return new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle('⚠️ URGENT: 7 Days Until Registration Closes!')
        .setDescription(`Time is running out to register for ${name}!`)
        .addFields(
          { name: '⏰ Deadline', value: dates.registration_end, inline: true },
          { name: '⏳ Time Left', value: '7 DAYS', inline: true },
          { name: '🎯 Action Required', value: 'Register your team NOW!' }
        )
        .setFooter({ text: 'Don\'t miss this opportunity!' })
        .setTimestamp();
    },
  },
  // Final day registration reminder (Jan 31 at 9 AM and 6 PM)
  {
    cronExpression: '0 9,18 31 1 *',
    channelId: process.env.ANNOUNCEMENTS_CHANNEL_ID || '',
    description: 'Final day registration reminder',
    message: () => {
      const { name } = hackathonData;
      return new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🚨 LAST DAY TO REGISTER! 🚨')
        .setDescription(`TODAY is your final chance to register for ${name}!`)
        .addFields(
          { name: '⏰ Deadline', value: 'TONIGHT at 11:59 PM' },
          { name: '🏃 Act Now', value: 'This is your last chance!' },
          { name: '🔗 Register', value: 'Visit the official website immediately!' }
        )
        .setFooter({ text: 'Registration closes in hours!' })
        .setTimestamp();
    },
  },
  // Event week reminders (March 10 at 6 PM - day before event)
  {
    cronExpression: '0 18 10 3 *',
    channelId: process.env.ANNOUNCEMENTS_CHANNEL_ID || '',
    description: 'Day before event reminder',
    message: () => {
      const { name, dates, location } = hackathonData;
      return new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle(`🎉 TOMORROW: ${name} Begins!`)
        .setDescription(`Get ready for ${dates.duration_hours} hours of innovation and collaboration!`)
        .addFields(
          { name: '📅 Date', value: `${dates.event_start} - ${dates.event_end}` },
          { name: '⏰ Check-in', value: 'Tomorrow at 11:00 AM' },
          { name: '📍 Venue', value: `${location.venue}, ${location.address}` },
          { name: '🎒 What to bring', value: 'Laptop, charger, ID, enthusiasm!' },
          { name: '💤 Pro tip', value: 'Get a good night\'s sleep!' }
        )
        .setTimestamp();
    },
  },
  // Event day morning (March 11 at 8 AM)
  {
    cronExpression: '0 8 11 3 *',
    channelId: process.env.ANNOUNCEMENTS_CHANNEL_ID || '',
    description: 'Event day morning reminder',
    message: () => {
      const { name, location } = hackathonData;
      return new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle(`🎊 IT'S HAPPENING! ${name} Day 1!`)
        .setDescription('Good morning! Today marks the beginning of an amazing journey!')
        .addFields(
          { name: '⏰ Check-in', value: '11:00 AM onwards' },
          { name: '🎤 Opening Ceremony', value: '2:00 PM' },
          { name: '🚀 Hacking Starts', value: '5:00 PM' },
          { name: '✨ Get Ready', value: `See you soon at ${location.venue}!` }
        )
        .setFooter({ text: 'Let the innovation begin!' })
        .setTimestamp();
    },
  },
];

export function setupScheduledMessages(client: Client): void {
  console.log('🕐 Setting up scheduled messages...');

  scheduledMessages.forEach((scheduleItem) => {
    // Validate cron expression
    if (!cron.validate(scheduleItem.cronExpression)) {
      console.error(`❌ Invalid cron expression: ${scheduleItem.cronExpression}`);
      return;
    }

    // Schedule the task
    cron.schedule(scheduleItem.cronExpression, async () => {
      console.log(`⏰ Running scheduled task: ${scheduleItem.description}`);

      if (!scheduleItem.channelId) {
        console.warn('⚠️ No channel ID configured for scheduled message');
        return;
      }

      try {
        const channel = await client.channels.fetch(scheduleItem.channelId);

        if (!channel || !channel.isTextBased()) {
          console.error('❌ Invalid channel for scheduled message');
          return;
        }

        const textChannel = channel as TextChannel;

        // Send the message
        if (typeof scheduleItem.message === 'function') {
          const embed = scheduleItem.message();
          await textChannel.send({ embeds: [embed] });
        } else {
          await textChannel.send(scheduleItem.message);
        }

        console.log(`✅ Scheduled message sent: ${scheduleItem.description}`);
      } catch (error) {
        console.error('❌ Error sending scheduled message:', error);
      }
    });

    console.log(`✅ Scheduled: ${scheduleItem.description} (${scheduleItem.cronExpression})`);
  });

  console.log(`🎯 Total scheduled tasks: ${scheduledMessages.length}`);
}
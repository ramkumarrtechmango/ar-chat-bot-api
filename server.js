const dotenv = require('dotenv');
const app = require('./index');
const port = process.env.PORT || 3000;
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

var server = require('http').createServer(app);

// Connect bot
const connectChatBot = client.on('ready', () => {
    console.log('bot is ready');
});

server = server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// module.exports.connectChatBot = connectChatBot;

connectChatBot.login(process.env.DISCORD_BOT_ID);
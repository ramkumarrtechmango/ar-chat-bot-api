const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: './.env' });
const app = require('./index');
const axios = require('axios');
const config = require('./config.json')
const port = config.port ||3000;
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const dbURL = 'mongodb://localhost:27017/shop';

mongoose
  .connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err));

var server = require('http').createServer(app);

// Connect bot
const connectChatBot = client.on('ready', () => {
    console.log('bot is ready');
});

server = server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// module.exports.connectChatBot = connectChatBot;

connectChatBot.on('messageCreate', async (message) => {
    console.log('message',message)
    if (message.content === 'ping') {
        message.reply({
            content: 'pong',
        })
    }
    else if (message.content === 'quote') {
        let resp = await axios.get(`https://api.quotable.io/random`);
        const quote = resp.data.content;

        message.reply({
            content: quote,
        })
    }else if (message.content === 'hi') {
        message.reply({
            content: 'How are you',
        })
    }
});

connectChatBot.login(config.discord_bot_id);
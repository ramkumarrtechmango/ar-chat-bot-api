const dotenv = require('dotenv').config({path: __dirname + '/.env'});
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
    console.log(`App running on port = ${port}...`);
});


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

// module.exports.connectChatBot = connectChatBot;

connectChatBot.login(process.env.DISCORD_BOT_ID);
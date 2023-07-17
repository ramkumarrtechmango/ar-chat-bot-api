const AppError = require('../helpers/appError');
const axios = require('axios');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const config = require('../config.json');

exports.createHook = async (req, res, next) => {
    console.log(req.body);
    const { hookName } = req.body;

    if (!hookName) {
        return next(
            new AppError("Kindly send hook name", 400)
        );
    }

    try {
        let params = {
            name: hookName,
            avatar: 'https://i.imgur.com/BqwwG0s.jpeg',
        };
        let urls = `https://discord.com/api//channels/1126029326576517150/webhooks`;
        console.log('urls', urls);
        let response = await axios.post({ urls, method: 'post', params });
        console.log('Response', response);
    } catch (error) {
        next(error);
    }
};

exports.chatWithMe = async (req, res, next) => {
    console.log(req.body);
    const webhookClient = new WebhookClient({ id: config.webhook_id, token: config.webhook_token });
    const { message } = req.body;

    if (!message) {
        return next(
            new AppError("Kindly send message", 400)
        );
    }

    try {
        const embed = new EmbedBuilder()
            .setTitle('Some Title')
            .setColor(0x00FFFF);

        webhookClient.send({
            content: message,
            username: 'Ramkumar',
            avatarURL: 'https://i.imgur.com/AfFp7pu.png',
            embeds: [embed],
        }).then((response) => {
            console.log('Response=>', response.id);
            if (response.id) {
                console.log('Come')
                res.status(200).json({
                    status: 'Success',
                    result: response
                });
            }
        });

    } catch (error) {
        next(error);
    }
};
const AppError = require('../helpers/appError');
const axios = require('axios');

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
            name: hookName
        };
        let urls = `https://discordapp.com/api/channels/${process.env.WEBHOOK_ID}/webhooks`;
        console.log('urls', urls);
        let response = await axios.post({urls, method:'post', params, headers:{
            Authorization: `Bot ${process.env.DISCORD_BOT_ID}`,
        }});
        console.log('Response', response);
    } catch (error) {
        next(error);
    }
};

exports.chatWithMe = async (req, res, next) => {
    console.log(req.body);
    const { message } = req.body;

    if (!message) {
        return next(
            new AppError("Kindly send message", 400)
        );
    }

    try {
        res.status(200).json({
            status: 'Success',
            result: {
                message: 'Welcome',
            },
        });
    } catch (error) {
        next(error);
    }
};
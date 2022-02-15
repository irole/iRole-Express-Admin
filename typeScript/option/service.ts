module.exports = {
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        callback_url: process.env.GOOGLE_CALLBACK_URL,
    },
    facebook: {
        app_id: process.env.FACEBOOK_APP_ID,
        app_secret: process.env.FACEBOOK_APP_SECRET,
        callback_url: process.env.FACEBOOK_CALLBACK_URL,
    },
};

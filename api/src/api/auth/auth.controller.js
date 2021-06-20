// #region Global Imports
const axios = require('axios');
const qs = require('qs');
// #endregion Global Imports

// #region Local Imports
const sendError = require('../../libs/sendError');
// #endregion Local Imports

async function signInWithLine(req, res) {
    const { code } = req.body;

    if (!code) {
        sendError(
            res,
            400,
            'invalid_request_error',
            'parameter_missing',
            '`Code` is missing.',
        );
        return;
    }

    try {
        /* eslint-disable camelcase */
        const data = qs.stringify({
            client_id: process.env.OAUTH_LINE_CHANNEL_ID,
            client_secret: process.env.OAUTH_LINE_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/auth/oauth/line',
        });
        /* eslint-enable camelcase */

        const token = await axios.post(
            'https://api.line.me/oauth2/v2.1/token',
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        res.json(token.data);
    } catch (e) {
        if (e.response && e.response.data) {
            const {
                error: errorCode,
                error_description: errorDescription,
            } = e.response.data;
            sendError(
                res,
                e.status,
                'api_error',
                errorCode || '',
                errorDescription || 'Something went wrong on Line side.',
            );
            return;
        }
        sendError(res, 500, 'api_error', '', 'Something went wrong.');
    }
}

module.exports = { signInWithLine };

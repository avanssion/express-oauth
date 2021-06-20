// #region Global Imports
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const qs = require('qs');
// #endregion Global Imports

// #region Local Imports
const morgan = require('./middlewares/morgan');
const sendError = require('./libs/sendError');
// #endregion Local Imports

dotenv.config({ path: '.env.local' });

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan);

app.post('/auth/oauth/line', async (req, res) => {
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
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});

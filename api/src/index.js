// #region Global Imports
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const qs = require('qs');
// #endregion Global Imports

// #region Local Imports
const morgan = require('./middlewares/morgan');
// #endregion Local Imports

dotenv.config({ path: '.env.local' });

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan);

app.get('/auth/line/callback', async (req, res) => {
    const { code, error, error_description: errorDescription } = req.query;
    if (!code) {
        res.json({ error, errorDescription });
    }

    try {
        /* eslint-disable camelcase */
        const data = qs.stringify({
            client_id: process.env.OAUTH_LINE_CHANNEL_ID,
            client_secret: process.env.OAUTH_LINE_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:4000/auth/line/callback',
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
            res.json(e.response.data);
            return;
        }
        res.json({ error: e.toString() });
    }
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});

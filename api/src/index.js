// #region Global Imports
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
// #endregion Global Imports

// #region Local Imports
const morgan = require('./middlewares/morgan');
const { authRouter } = require('./api');
// #endregion Local Imports

dotenv.config({ path: '.env.local' });

const app = express();
const port = 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan);

// routers
app.use(authRouter);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});

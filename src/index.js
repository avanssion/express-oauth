// #region Global Imports
const express = require('express');
// #endregion Global Imports

// #region Local Imports
const morgan = require('./middlewares/morgan');
// #endregion Local Imports

const app = express();
const port = 3000;

app.use(morgan);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

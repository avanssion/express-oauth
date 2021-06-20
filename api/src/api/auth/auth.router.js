// #region Global Imports
const express = require('express');
// #endregion Global Imports

// #region Local Imports
const AuthController = require('./auth.controller');
// #endregion Local Imports

const authRouter = express.Router();

authRouter.post('/auth/oauth/line', AuthController.signInWithLine);

module.exports = authRouter;

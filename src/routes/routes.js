const express = require('express');
const routes = express.Router();
const auth = require('../auth');

routes.post('/auth', auth.local);

module.exports = routes;
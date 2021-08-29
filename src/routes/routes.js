const express = require('express');
const routes = express.Router();
const auth = require('../auth');

// generate JWT with valid login
routes.post('/auth', auth.local);

module.exports = routes;
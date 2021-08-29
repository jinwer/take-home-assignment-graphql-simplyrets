const axios = require('axios');
const logger = require('../logger');


// Hardcode simplyrets.com as suggested in the docs and dev user guide
const BASE_URL = 'https://api.simplyrets.com';
const opts = {
  headers: {},
  auth: {
    username: 'simplyrets',
    password: 'simplyrets',
  }
};

const api = {
  getProperties: async () => {
    try {
      logger.info('getProperties');
      const { data } = await axios.get(`${BASE_URL}/properties`, opts);
      return data;
    } catch (err) {
      logger.error('getProperties failed', err);
    }

  },
}

module.exports = api;
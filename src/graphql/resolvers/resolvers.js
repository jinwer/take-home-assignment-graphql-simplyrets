const logger = require('../../logger');
const { listings } = require('../../dto');

const resolvers = {
  Query: {
    listings: async (_, args) => {
      logger.info('Listing');
      if (args && Object.keys(args).length) logger.info(args);

      const data = await listings.getListings(args);
      return data;
    }
  }
}

module.exports = resolvers;
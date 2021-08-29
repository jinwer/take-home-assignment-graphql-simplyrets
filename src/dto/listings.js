const logger = require("../logger");
const api = require("../api");

const makeListings = (properties) => {
  // TODO: check data integrity and also convert to our listings object if
  // field is not matched???
  return properties;
};

const listings = {
  // getListings get properties listings from api
  // and convert it to our listings object
  getListings: async (filter) => {
    logger.info("getListings");
    const data = await api.getProperties();
    const listings = makeListings(data);

    if (!filter || !Object.keys(filter).length) return listings;

    // TODO: hardcoded filter options for now
    if (filter && filter.city) {
      return listings.filter((l) => l.address?.city === filter.city);
    }
    return [];
  },
};

module.exports = listings;

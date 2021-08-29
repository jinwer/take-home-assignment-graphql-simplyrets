const listings = require('./listings');
const api = require('../api');
const dummyListings = require('../graphql/resolvers/dummyListings');

api.getProperties = jest.fn().mockReturnValue(dummyListings.listings);

describe('listings', () => {
  describe('getListings', () => {
    afterEach(() => {
      api.getProperties.mockClear();
    })
    it('should return listings', async () => {
      const data = await listings.getListings();
      expect(api.getProperties).toHaveBeenCalledTimes(1);
      expect(data).toEqual(dummyListings.listings);
    })

    it('should return listings with filter.city', async () => {
      const data = await listings.getListings({city: 'city2'});
      expect(api.getProperties).toHaveBeenCalledTimes(1);
      expect(data).toEqual(dummyListings.city2);
    })

    it('should return empty if not found the city', async () => {
      const data = await listings.getListings({city: 'no such city'});
      expect(api.getProperties).toHaveBeenCalledTimes(1);
      expect(data).toEqual([]);
    })

    it('should return empty with wrong filter', async () => {
      const data = await listings.getListings({noSuchThing: 'city2'});
      expect(api.getProperties).toHaveBeenCalledTimes(1);
      expect(data).toEqual([]);
    })
  })
})
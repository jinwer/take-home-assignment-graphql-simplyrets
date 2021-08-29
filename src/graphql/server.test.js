const { gql } = require('apollo-server-express');

const server = require('./server');
const dummyListings = require('./resolvers/dummyListings');
const { listings } = require('../dto');


listings.getListings = jest.fn().mockReturnValue(dummyListings.listings);

const GET_LISTINGS = gql`
  query {
    listings {
      listingId
    }
  }
`

const GET_LISTINGS_CITY1 = gql`
  query {
    listings(city: "city1") {
      listingId
      address {
        city
      }
    }
  }
`

describe('graphql server', () => {
  afterEach( () => {
    listings.getListings.mockClear();
  })
  it('should get no data with wrong query', async () => {
    const res = await server.executeOperation({query: "wrong"});
    expect(res?.errors).not.toBeUndefined();
    expect(res?.data).toBeUndefined();
  })

  it('should serve listings', async () => {
    const res = await server.executeOperation({query: GET_LISTINGS});
    expect(res?.errors).toBeUndefined();
    expect(res?.data).not.toBeUndefined();
    expect(res?.data?.listings).toEqual(dummyListings.listings.map(l => ({listingId: l.listingId})));
  })

  it('should serve listings with filtering city', async () => {
    const res = await server.executeOperation({query: GET_LISTINGS_CITY1});
    expect(res?.errors).toBeUndefined();
    expect(res?.data).not.toBeUndefined();
    expect(res?.data?.listings[0]?.address?.city).toBe('city1');
  })
})

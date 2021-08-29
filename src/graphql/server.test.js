const { AuthenticationError, gql } = require('apollo-server-express');

const server = require('./server');
const dummyListings = require('./resolvers/dummyListings');
const { listings } = require('../dto');
const auth = require('../auth');


listings.getListings = jest.fn().mockReturnValue(dummyListings.listings);
auth.getUser = jest.fn().mockReturnValue({user: 'user1'});

const jwt = "Bearer 12312312323";
const req = {headers: {authorization: jwt}};


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

  it('should fail if not auth', async () => {
    await expect(server.executeOperation({query: "test"})).rejects.toThrow(AuthenticationError);
  })

  it('should get no data with wrong query', async () => {
    const res = await server.executeOperation({query: "wrong"}, {req});
    expect(res?.errors).not.toBeUndefined();
    expect(res?.data).toBeUndefined();
  })

  it('should serve listings', async () => {
    const res = await server.executeOperation({query: GET_LISTINGS}, {req});
    expect(res?.errors).toBeUndefined();
    expect(res?.data).not.toBeUndefined();
    expect(res?.data?.listings).toEqual(dummyListings.listings.map(l => ({listingId: l.listingId})));
  })

  it('should serve listings with filtering city', async () => {
    const res = await server.executeOperation({query: GET_LISTINGS_CITY1}, {req});
    expect(res?.errors).toBeUndefined();
    expect(res?.data).not.toBeUndefined();
    expect(res?.data?.listings[0]?.address?.city).toBe('city1');
  })
})

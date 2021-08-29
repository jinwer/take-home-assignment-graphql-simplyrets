const { gql } = require('apollo-server-express');
const dummyListings = require('./resolvers/dummyListings');
const server = require('./server');

const GET_LISTINGS = gql`
  query {
    listings {
      listingId
    }
  }
`

describe('graphql server', () => {
  it('should get no data with wrong query', async () => {
    const res = await server.executeOperation({query: "wrong"});
    expect(res?.errors).not.toBeUndefined();
    expect(res?.data).toBeUndefined();
  })

  it('should query properties', async () => {
    const res = await server.executeOperation({query: GET_LISTINGS});
    expect(res?.errors).toBeUndefined();
    expect(res?.data).not.toBeUndefined();
    expect(res?.data?.listings).toEqual(dummyListings.map(l => ({listingId: l.listingId})));
  })

})

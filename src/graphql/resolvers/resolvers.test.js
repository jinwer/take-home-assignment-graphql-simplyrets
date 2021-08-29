const dummyListings = require("./dummyListings");
const resolvers = require("./resolvers");
const { listings } = require("../../dto");

listings.getListings = jest.fn().mockReturnValue(dummyListings.listings);

describe("resolvers", () => {
  it("should query listings", async () => {
    const res = await resolvers.Query.listings();

    expect(res).toEqual(dummyListings.listings);
  });
});

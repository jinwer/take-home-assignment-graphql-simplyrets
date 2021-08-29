const city1 = [
  {
    listingId: '1',
    terms: '1sadfjas',
    address: {
      city: 'city1',
      full: 'full address',
    },
    listPrice: 1231233,
  },
];

const city2 = [
  {
    listingId: '2',
    terms: '1sadfja dafdsfdf',
    address: {
      city: 'city2',
      full: 'full address',
    },
    listPrice: 12312133,
  },
  {
    listingId: '3',
    terms: '1sadfja dafdsfdfddd',
    address: {
      city: 'city2',
      full: 'full address',
    },
    listPrice: 12312133,
  },
];

module.exports = {
  city1,
  city2,
  listings: [
    ...city1,
    ...city2,
  ]
}
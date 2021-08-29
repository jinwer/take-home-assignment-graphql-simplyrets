const req = require('supertest');
const app = require('./index');

let server;
beforeEach(async () => {
  server = await app;
})

afterEach(() => {
  server && server.close();
})

describe('server url', () => {
  it('should not have /', (done) => {
    req(server)
      .get('/')
      .expect(404, done);
  });
  it('should have /auth', (done) => {
    req(server)
      .post('/auth')
      .expect(401, done);
  });
});
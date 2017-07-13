process.env.NODE_ENV = 'test';

const chai = require('chai');
const mock = require('mock-require');
const nock = require('nock');
const request = require('supertest');

const {expect} = chai;

mock('./config.js', {
  routesPath: '../example/routes',
  bundleUrl: 'mybundleurl',
  graphql: 'http://example.com/graphql',
});

let appModule = null;
let app = null;

describe('Render tests', function() {
  beforeEach(function() {
    Object.keys(require.cache).forEach((key) => delete require.cache[key]);
    appModule = require('./app.js');
    app = appModule.default;
    // give tests 10 seconds to run (travis seems slower than local dev)
    this.timeout(10000);
  });
  describe('should render index route', () => {
    it('renders html', (done) => {
      request(app)
        .get('/')
        .end((_err, res) => {
          expect(res.statusCode).to.equal(200);
          // simple check to make sure that there was a React-rendered div with
          // "Index Component" inside
          expect(res.text).to.match(/data-reactid.*(>Index Component)</);
          done();
        });
    });
    it('has bundle script', (done) => {
      request(app)
        .get('/')
        .end((_err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.text).to.match(/script.*src="mybundleurl">/);
          done();
        });
    });
  });
  describe('should use react-router', () => {
    it('renders html', (done) => {
      request(app)
        .get('/hello')
        .end((_err, res) => {
          // simple check to make sure that there was a React-rendered div with
          // the hello world component text
          expect(res.text).to.match(/data-reactid.*(>Hello world! \(hello component\))</);
          done();
        });
    });
    it('returns 404 if not found', (done) => {
      request(app)
        .get('/somethingthatdoesntexist')
        .end((_err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
  describe('should support graphql', () => {
    it('preloads state', (done) => {
      nock('http://example.com')
        .post('/graphql')
        .reply(200, {
          data: {
            persons: [
              {
                id: 1,
                name: 'Vinnie Magro',
                __typename: 'Person',
              },
            ],
          },
        });
      request(app)
        .get('/gql')
        .end((_err, res) => {
          expect(res.statusCode).to.equal(200);
          // make sure that somewhere graphql data gets rendered
          expect(res.text).to.match(/data-reactid.*(>Vinnie Magro)</);
          done();
        });
    });
  });
});

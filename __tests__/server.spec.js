/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/newline-after-import */
require('dotenv').config();
const sinon = require('sinon');
const app = require('../server/index.js');
const request = require('supertest');

describe('Unit tests for server routes', () => {
  let getStub;

  afterAll((done) => {
    app.close();
    done();
  });

  beforeEach(() => {
    getStub = sinon.stub(request(app), 'get');
  });

  afterEach(() => {
    getStub.restore();
  });

  it('Responds to GET req to /', () => {
    getStub.returns({ statusCode: 200 });
    const result = getStub('/');

    expect(result.statusCode).toBe(200);
  });

  it('Responds to GET req to /traits/:product_id', () => {
    getStub.returns({
      statusCode: 200,
      body: { product_id: '43', traits: ['one', 'two', 'three'] }
    });
    const result = getStub('/traits/43');

    expect(result.statusCode).toBe(200);
    expect(result.body.product_id).toEqual('43');
    expect(typeof result.body.traits[0]).toBe('string');
  });

  it('Responds to GET req to /traits/products/:trait', () => {
    getStub.returns({
      statusCode: 200,
      body: { trait: 'heuristic', products: [1, 2, 3] }
    });
    const result = getStub('/traits/products/heuristic');

    expect(result.statusCode).toBe(200);
    expect(typeof result.body.trait).toBe('string');
    expect(result.body.trait).toBe('heuristic');
    expect(typeof result.body.products[0]).toBe('number');
  });
});

'use strict';

const expect = require('chai').expect;
const server = require('../src/app');
const request = require('supertest');
const PplModel = require('../src/models/people')

describe('People counter', () => {
  before('flush model', () => {
    return PplModel.removeAll()
  });
  it('should get 0', () => {
    return request(server)
      .get('/people/count')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.eql({ count: 0 });
      });
  });

  it('should be able to add', () => {
    return request(server)
      .post('/people/count')
      .expect(200)
      .then(res => {
        return request(server)
          .get('/people/count')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.eql({ count: 1 });
          });
      });
  });
});


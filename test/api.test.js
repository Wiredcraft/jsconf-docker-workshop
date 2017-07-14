'use strict';

const expect = require('chai').expect;
const server = require('../src/app');
const request = require('supertest');
const PplModel = require('../src/models/people')

describe('People counter', () => {
  before('flush model', () => {
    return PplModel.reset()
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
      .send({ name: 'alice' })
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

  it('should not be able to add bad guy', () => {
    return request(server)
      .post('/people/count')
      .send({
        name: 'bob' //bob is bad guy
      })
      .expect(403)
  })
});


import request from 'supertest';
import {Express} from 'express-serve-static-core';

import {createServer} from '@exmpl/utils/server';
import { doesNotMatch } from 'assert';

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe('GET /hello', () => {
  it('should return 200 and valid response when param list is empty', async (done) => {
    request(server)
      .get(`/api/v1/hello`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'message':'Hello, stranger!'});
        done();
      })
  });
  it('should return 200 and valid response when name param is set', async (done) => {
    const nameParam = 'MaximilianoTestName';
    request(server)
      .get(`/api/v1/hello?name=${nameParam}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'message': `Hello, ${nameParam}!`});
        done();
      });
  });
  it.skip('should return 400 and valid error response when param is empty', async (done) => {
    request(server)
      .get(`/api/v1/hello?name=`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'error': {
          type: 'request_validation',
          message: expect.stringMatching(/Empty.*\'name\'/),
          errors: expect.anything()
        }});
      });
  });

});

describe('GET /goodbye', () => {
  it('should return 200 and valid response to authorization with fakeToken request', async (done) => {
    request(server)
      .get(`/api/v1/goodbye`)
      .set('Authorization', 'Bearer fakeToken')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).toMatchObject({'message': 'Goodbye, fakeTokenId!'});
        done();
      });
  });

});
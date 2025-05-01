import request from 'supertest';

import { app } from '../../app';

it('Fails when a email that does not exist in supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test.signin@test.com',
      password: 'test.signin',
    })
    .expect(400);
});

it('Fails when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test.signup@test.com',
      password: 'test.signup',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test.signin@test.com',
      password: 'ddsqdsq',
    })
    .expect(400);
});

it('Respond with cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test.signup@test.com',
      password: 'test.signup',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test.signup@test.com',
      password: 'test.signup',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

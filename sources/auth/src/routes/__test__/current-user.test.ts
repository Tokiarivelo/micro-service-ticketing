import request from 'supertest';

import { app } from '../../app';

it('Responds with details about current user', async () => {
  const cookie = await signin(); // get from global.signin

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Responds 401 status if not authenticated', async () => {
  await request(app).get('/api/users/currentuser').send().expect(401);
});

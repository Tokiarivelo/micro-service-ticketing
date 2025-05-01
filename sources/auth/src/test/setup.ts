import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
}

jest.setTimeout(100000); // 10s

let mongo: MongoMemoryServer | undefined;

beforeAll(async () => {
  // envs
  process.env.JWT_KEY = 'abscdefg';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo?.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const body = {
    email: 'test@test.com',
    password: 'test',
  };

  const authResponse = await request(app)
    .post('/api/users/signup')
    .send(body)
    .expect(201);

  const cookie = authResponse.get('Set-Cookie') || [];

  return cookie;
};

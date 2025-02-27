import mongoose from 'mongoose';

import { app } from './app';
import { configs } from './utils/env-config';

const start = async () => {
  if (!configs.port) {
    throw new Error('PORT must be defined');
  }
  if (!configs.jwtKey) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    console.log('connecting to MongoDb :  ', configs.mongoDbUrl);
    await mongoose.connect(`${configs.mongoDbUrl}/auth`);

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(configs.port, () => {
    console.log(`Listening on port ${configs.port}!!!!!!!!`);
  });
};

start();

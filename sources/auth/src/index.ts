import express, { json } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { configs } from './utils/env-config';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!configs.jwtKey) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://localhost:27017/auth');

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3005, () => {
    console.log('Listening on port 3005!!!!!!!!');
  });
};

start();

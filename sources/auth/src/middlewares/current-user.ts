import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { configs } from '../utils/env-config';
import { UserAttrs } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserAttrs;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, configs.jwtKey!) as UserAttrs;
    req.currentUser = payload;
  } catch (error) {}

  next();
};

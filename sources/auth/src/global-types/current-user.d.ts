import { UserAttrs } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserAttrs;
    }
  }
}

export {};

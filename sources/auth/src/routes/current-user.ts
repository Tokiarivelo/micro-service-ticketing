import express from 'express';
import jwt from 'jsonwebtoken';

import { configs } from '../utils/env-config';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({
      currentUser: null,
    });
  }

  try {
    const payload = jwt.verify(req.session.jwt, configs.jwtKey!);

    res.send({
      currentUser: payload,
    });
  } catch (error) {
    res.send({
      currentUser: null,
    });
  }
});

export { router as currentUserRouter };

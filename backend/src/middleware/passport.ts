import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import env from '../environment.js';
import { NextFunction, Request, Response } from 'express';

passport.use(new BearerStrategy(
  async (authToken, done) => {
    await jwt.verify(authToken, env.jwtAccessSign, (err, decoded) => {
      if(err) {
        return done(err);
      }
      done(null, true);
    });
  }
))

export const bearerPassport = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate(
    'bearer', 
    { session: false },
    (err: any, value: any, info: any) => {
      if(!req.headers.authorization) {
        const noTokenErr = new Error ('token not recieved')
        return next(noTokenErr)
      } else if (err) {
        next(err)
      }
      next()
    }
  )(req, res, next)
}

export default passport;
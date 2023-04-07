import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import env from '../environment.js'
import { getUsers } from '../services/users.services.js';

interface IDecoded {
  id: string;
}

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const user = await getUsers({email: email})
  if(!user) {
    return res.status(401).json({err:'No user with this email'})
  }
  const passValid = await bcrypt.compare(password, user[0].password)
  if(!passValid) {
    return res.status(401).json({err:'Wrong password'})
  }
  const { id } = user[0]
  const accessToken = await jwt.sign({ id }, env.jwtAccessSign, { expiresIn: '15m' });
  const refreshToken = await jwt.sign({ id }, env.jwtRefreshSign);
  res.cookie('jwtRef', refreshToken, {httpOnly: true});
  return res.status(201).json({accessToken: accessToken, userId: id});
}

export const refreshAccess = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body
  const decoded = jwt.verify(refreshToken, env.jwtRefreshSign) as IDecoded;
  if(!decoded) {
    return res.status(403).json({err:'invalid refresh token'})
  }
  const newAccess = await jwt.sign({ id: decoded.id }, env.jwtAccessSign)
  return res.status(201).json({accessToken: newAccess})
}
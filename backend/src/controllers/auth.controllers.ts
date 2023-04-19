import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import env from '../environment.js'
import { getUserByParamsSRV } from '../services/users.services.js';

interface IDecoded {
  id: string;
}

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const user = await getUserByParamsSRV({email: email})
  if(!user[0]) {
    return res.status(401).json({error:'No user with this email'})
  }
  const passValid = await bcrypt.compare(password, user[0].password)
  if(!passValid) {
    return res.status(401).json({error:'Wrong password'})
  }
  const { id } = user[0]
  const accessToken = await jwt.sign({ id }, env.jwtAccessSign, { expiresIn: '15m' });
  const refreshToken = await jwt.sign({ id }, env.jwtRefreshSign);
  res.cookie('jwtRef', refreshToken, {httpOnly: true});
  return res.status(201).json({accessToken: accessToken, userId: id});
}

export const refreshAccess = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies)
  const { jwtRef } = req.cookies
  const decoded = jwt.verify(jwtRef, env.jwtRefreshSign) as IDecoded;
  if(!decoded) {
    return res.status(401).json({error:'Invalid refresh token'})
  }
  const newAccess = await jwt.sign({ id: decoded.id }, env.jwtAccessSign)
  return res.status(201).json({accessToken: newAccess})
}
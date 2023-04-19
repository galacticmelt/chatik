import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { 
  getUserByParamsSRV, 
  getUserByIdSRV,
  createUserSRV, 
  deleteUserSRV, 
  updateUserSRV 
} from "../services/users.services.js";

export const getUserByParams = async (req: Request, res: Response) => {
  const user = await getUserByParamsSRV(req.body);
  if(!user[0]) {
    return res.status(404).json({error: 'user not found'})
  }
  return res.status(201).json({user: user})
}

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId
  const user = await getUserByIdSRV(id);
  if(!user) {
    return res.status(404).json({error: 'user not found'})
  }
  return res.status(201).json({user: user})
}

export const createUser = async (req: Request, res: Response) => {
  const { password } = req.body
  const hashedPass = await bcrypt.hash(password, 10);
  const user = await createUserSRV({...req.body, password: hashedPass})
  return res.status(201).json({created: `user with id '${user.id}'`});
}

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId
  const updates = req.body
  const user = await updateUserSRV(id, updates)
  if(!user) {
    return res.status(404).json({error: `user not found`})
  }
  return res.status(201).json({updated: `user with id '${id}'`});
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId
  const deleted = await deleteUserSRV(id)
  if(!deleted) {
    return res.status(404).json({error: `user not found`})
  }
  return res.status(201).json({deleted: `user with id '${id}'`})
}


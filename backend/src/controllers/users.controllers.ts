import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { getUsers, createUser, deleteUser, updateUser } from "../services/users.services.js";

export const getUsersController = async (req: Request, res: Response) => {
  const user = await getUsers(req.body);
  if(!user[0]) {
    return res.status(404).json({error: 'user not found'})
  }
  return res.status(201).json({user: user})
}

export const createUserController = async (req: Request, res: Response) => {
  const { password } = req.body
  const hashedPass = await bcrypt.hash(password, 10);
  const user = await createUser({...req.body, password: hashedPass})
  return res.status(201).json({created: `user with id '${user.id}' with email "${user.email}"`});
}

export const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.userId
  const updates = req.body
  const user = await updateUser(req.params.userId, req.body)
  if(!user) {
    return res.status(404).json({error: `user with id '${id}' not found`})
  }
  return res.status(201).json({updated: `user with id '${id}' with following: ${JSON.stringify(updates)}`});
}

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.userId
  const deleted = await deleteUser(id)
  if(!deleted) {
    return res.status(404).json({error: `user with id '${id}' not found`})
  }
  return res.status(201).json({deleted: `user with id '${id}'`})
}


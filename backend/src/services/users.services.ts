import User from "../models/user.model.js"

interface IUserCreate {
  username: string,
  email: string,
  password: string
}

interface IUserUpdate {
  username?: string,
  email?: string,
  chats?: string[]
}

interface IUserGetByParams {
  _id?: any,
  username?: string 
  email?: string 
}

const getUserByParams = (params: IUserGetByParams) => {
  return User.find(params)
}

const getUserById = (userId: string) => {
  return User.findById(userId, { password: 0, chats: 0 })
}

const createUser = (user: IUserCreate) => {
  return User.create(user);
}

const deleteUser = (userId: string) => {
  return User.findByIdAndDelete(userId)
}

const updateUser = (userId: string, update: IUserUpdate) => {
  return User.findByIdAndUpdate(userId, update)
}

export const usersServices = { 
  getUserByParams, 
  getUserById, 
  createUser, 
  deleteUser, 
  updateUser 
}
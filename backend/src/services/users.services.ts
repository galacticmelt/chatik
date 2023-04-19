import User from "../models/user.model.js"

interface IUser {
  username: string,
  email: string,
  password: string
}

interface IUserUpdate {
  username?: string,
  email?: string,
  chats?: string[]
}

interface IParams {
  _id?: any,
  username?: string 
  email?: string 
}

const getUserByParamsSRV = (params: IParams) => {
  return User.find(params)
}

const getUserByIdSRV = (userId: string) => {
  return User.findById(userId).populate({path: 'chats'})
}

const createUserSRV = (user: IUser) => {
  return User.create(user);
}

const deleteUserSRV = (userId: string) => {
  return User.findByIdAndDelete(userId)
}

const updateUserSRV = (userId: string, update: IUserUpdate) => {
  return User.findByIdAndUpdate(userId, update)
}

export { 
  getUserByParamsSRV, 
  getUserByIdSRV, 
  createUserSRV, 
  deleteUserSRV, 
  updateUserSRV 
}
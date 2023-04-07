import User from "../models/user.model.js"

interface IUser {
  username: String,
  email: String,
  token: String 
}

interface IUserUpdate {
  username?: String,
  email?: String,
}

interface IParams {
  _id?: any,
  username?: String 
  email?: String 
  token?: String 
}

const getUsers = (params: IParams) => {
  return User.find(params)
}

const createUser = (user: IUser) => {
  return User.create(user);
}

const deleteUser = (userId: string) => {
  return User.findByIdAndDelete(userId)
}

const updateUser = (userId: string, update: IUserUpdate) => {
  return User.findByIdAndUpdate(userId, update)
}

export { getUsers, createUser, deleteUser, updateUser }
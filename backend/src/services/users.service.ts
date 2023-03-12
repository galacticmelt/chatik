import User from "../models/user.model.js"

interface IUser {
  username: String,
  email: String,
  token: String | null,
  chats: [] | null
}

interface IParams {
  username: String | null,
  email: String | null,
  token: String | null,
  chats: [] | null
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

const updateUser = (userId: string, username: string) => {
  return User.findByIdAndUpdate(userId, {username: username})
}

export { getUsers, createUser, deleteUser, updateUser }
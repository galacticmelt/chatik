import Chat from "../models/chat.model.js";

interface IChat {
  users: string[]
}

interface IChatUpdate {
  lastMessage: string 
}

const createChat= (chat: IChat) => {
  return Chat.create(chat)
}

const getChatById= (chatId: string) => {
  return Chat.findById(chatId)
}

const getChatsByUser = (userId: string) => {
  return Chat.find(
    { users: { $in: [userId] } }
  ).populate({path: 'users', select: 'username'}).populate({path: 'lastMessage'})
}

const updateChat = (chatId: string, update: IChatUpdate) => {
  return Chat.findByIdAndUpdate(chatId, update);
}

const deleteChat = (chatId: string) => {
  return Chat.findByIdAndDelete(chatId)
}

export const chatsServices = { 
  createChat, 
  getChatById, 
  getChatsByUser,
  updateChat, 
  deleteChat 
}


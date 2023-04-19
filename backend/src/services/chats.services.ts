import Chat from "../models/chat.model.js";

interface IChat {
  users: string[]
}

const createChatSRV = (chat: IChat) => {
  return Chat.create(chat)
}

const getChatByIdSRV= (chatId: string) => {
  return Chat.findById(chatId)
}

const getChatsByUserSRV = (userId: string) => {
  return Chat.find(
    { users: { $in: [userId] } }
  ).populate({path: 'users', select: 'username'})
}

const deleteChatSRV = (chatId: string) => {
  return Chat.findByIdAndDelete(chatId)
}

export { 
  createChatSRV, 
  getChatByIdSRV, 
  getChatsByUserSRV, 
  deleteChatSRV 
}


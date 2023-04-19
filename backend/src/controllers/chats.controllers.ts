import { NextFunction, Request, Response } from "express";
import Chat from "../models/chat.model.js";
import { 
  createChatSRV, getChatByIdSRV, getChatsByUserSRV, deleteChatSRV
} from "../services/chats.services.js";
import User from "../models/user.model.js";

const createChatCTRL = async (req: Request, res: Response) => {
  const users = req.body.users
  const duplicate = await Chat.find({
    $and: [
      { users: { $in: [users[0]] } },
      { users: { $in: [users[1]] } }
    ]
  })
  if(duplicate[0]) {
    return res.status(400).json({error: 'chat between these users already exists'})
  }
  const newChat = await createChatSRV({users: [...users]})
  users.forEach(async (user: string) => {
    await User.findByIdAndUpdate(user, { $push: { chats: newChat.id } })
  });
  return res.status(201).json({created: `chat with id '${newChat.id}'`})
}

const getChatsByUserCTRL = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const chats = await getChatsByUserSRV(userId)
  if(!chats.length) {
    return res.status(404).json({error: 'no chats found'})
  }
  return res.status(201).json(chats)
}

const deleteChatCTRL = async (req: Request, res: Response) => {
  const chatId = req.params.chatId
  const chat = await deleteChatSRV(chatId)
  if(!chat) {
    return res.status(404).json({error: 'chat not found'})
  }
  return res.status(201).json({deleted: `chat with id '${chatId}'`})
}

export { createChatCTRL, getChatsByUserCTRL, deleteChatCTRL }

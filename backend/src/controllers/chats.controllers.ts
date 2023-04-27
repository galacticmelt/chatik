import { NextFunction, Request, Response } from "express";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import { chatsServices } from "../services/chats.services.js";

const createChat = async (req: Request, res: Response) => {
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
  let newChat = await chatsServices.createChat({users: [...users]})
  newChat = await newChat.populate({path: 'users', select: 'username'});
  users.forEach(async (user: string) => {
    await User.findByIdAndUpdate(user, { $push: { chats: newChat.id } })
  });
  return res.status(201).json(newChat);
}

const getChatsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const chats = await chatsServices.getChatsByUser(userId)
  return res.status(201).json(chats)
}

const deleteChat = async (req: Request, res: Response) => {
  const chatId = req.params.chatId
  const chat = await chatsServices.deleteChat(chatId)
  if(!chat) {
    return res.status(404).json({error: 'chat not found'})
  }
  return res.status(201).json({deleted: `chat with id '${chatId}'`})
}

export const chatsControllers = { createChat, getChatsByUser, deleteChat }

import { NextFunction, Request, Response } from "express";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import { chatsServices } from "../services/chats.services.js";
import { messagesServices } from "../services/messages.service.js";
import { DocExistsError } from "../errors.js";

const createChat = async (req: Request, res: Response, next: NextFunction) => {
  const users = req.body.users
  const duplicate = await Chat.find({
    $and: [
      { users: { $in: [users[0]] } },
      { users: { $in: [users[1]] } }
    ]
  })
  if(duplicate[0]) {
    next(new DocExistsError('chat between these users already exists'));
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
  await messagesServices.deleteMessagesByChat(chatId);
  const chat = await chatsServices.deleteChat(chatId);
  return res.status(201).json({deleted: `chat with id '${chatId}'`})
}

export const chatsControllers = { createChat, getChatsByUser, deleteChat }

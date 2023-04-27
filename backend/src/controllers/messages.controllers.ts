import { NextFunction, Request, Response } from "express";
import { messagesServices } from "../services/messages.service.js";
import { chatsServices } from "../services/chats.services.js";

const createMessage = async (req: Request, res: Response) => {
  const messageData = req.body
  const message = await messagesServices.createMessage(messageData)
  await chatsServices.updateChat(messageData.chatId, { lastMessage: message.id })
  return res.status(201).json({created: `message: '${message.text}'`})
}

const getMessagesByChat = async (req: Request, res: Response) => {
  const chatId = req.params.chatId
  const messages = await messagesServices.getMessagesByChat(chatId)
  return res.status(201).json(messages)
}

const deleteMessage = async (req: Request, res: Response) => {
  const messageId = req.params.messageId
  const deleted = messagesServices.deleteMessage(messageId)
  if(!deleted) {
    return res.status(404).json({error: 'message not found'})
  }
}

export const messagesControllers = { createMessage, getMessagesByChat, deleteMessage }

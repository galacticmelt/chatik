import { NextFunction, Request, Response } from "express";

import { createMessageSRV, getMessagesByChatSRV, deleteMessageSRV } from "../services/messages.service.js";

const createMessage = async (req: Request, res: Response) => {
  const messageData = req.body
  const message = await createMessageSRV(messageData)
  return res.status(201).json({created: `message: '${message.text}'`})
}

const getMessagesByChat = async (req: Request, res: Response) => {
  const chatId = req.params.chatId
  const messages = await getMessagesByChatSRV(chatId)
  return res.status(201).json(messages)
}

const deleteMessage = async (req: Request, res: Response) => {
  const messageId = req.params.messageId
  const deleted = deleteMessageSRV(messageId)
  if(!deleted) {
    return res.status(404).json({error: 'message not found'})
  }
}

export { createMessage, getMessagesByChat, deleteMessage }

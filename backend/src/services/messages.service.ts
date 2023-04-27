import Message from "../models/message.model.js";

interface IMessage {
  sender: string,
  chatId: string,
  text: string
}

const createMessage = (message: IMessage) => {
  return Message.create(message)
}

const getMessagesByChat = (chatId: string) => {
  return Message.find({chatId})
}

const deleteMessage = (messageId: string) => {
  return Message.find({messageId})
}

export const messagesServices = { createMessage, getMessagesByChat, deleteMessage }
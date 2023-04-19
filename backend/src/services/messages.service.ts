import Message from "../models/message.model.js";

interface IMessage {
  sender: string,
  chatId: string,
  text: string
}

const createMessageSRV = (message: IMessage) => {
  return Message.create(message)
}

const getMessagesByChatSRV = (chatId: string) => {
  return Message.find({chatId})
}

const deleteMessageSRV = (messageId: string) => {
  return Message.find({messageId})
}

export { createMessageSRV, getMessagesByChatSRV, deleteMessageSRV }
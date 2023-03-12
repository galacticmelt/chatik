import { db } from '../db'

const MessageSchema = new db.Schema({
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  chatId: {
    type: 'ObjectId',
    ref: 'Chat'
  }
})

const Message = db.model('Message', MessageSchema)

export default Message
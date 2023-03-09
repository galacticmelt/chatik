import { db } from '../db'

const ChatSchema = new db.Schema({
  title: String,
  users: [{
    type: 'ObjectId',
    ref: 'User'
  }]
})

const Chat = db.model('Chat', ChatSchema)

export default Chat
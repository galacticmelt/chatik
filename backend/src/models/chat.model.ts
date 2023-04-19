import { db } from '../db.js'

const ChatSchema = new db.Schema({
  users: [{
    type: 'ObjectId',
    ref: 'User'
  }]
})

const Chat = db.model('Chat', ChatSchema)

export default Chat
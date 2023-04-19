import { db } from '../db.js'

const UserSchema = new db.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [
    {
      type: 'ObjectId',
      ref: 'Chat'
    }
  ]
})
const User = db.model('User', UserSchema)

export default User 
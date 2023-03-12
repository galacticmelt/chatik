import { db } from '../db.js'

const UserSchema = new db.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: String,
  chats: [{
    type: 'ObjectId',
    ref: 'Chat'
  }]

})
const User = db.model('User', UserSchema)

export default User 
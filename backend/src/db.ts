import env from './environment.js'
import db from 'mongoose'

const connectDB = async () => {
  if(env.dbURL) {
    return await db.connect(env.dbURL, () => console.log('connected to DB successfully'));
  } else (
    console.log('error connecting to db')
  )
}

export { db, connectDB }
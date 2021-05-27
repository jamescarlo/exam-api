import mongoose from 'mongoose'
const Schema = mongoose.Schema

const usersSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

export default mongoose.model('users', usersSchema)

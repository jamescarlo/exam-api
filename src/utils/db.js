import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export default {
  // exported function to connect to mongodb
  connect: () => mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (error) => {
       if (error) {
         console.log(error)
       } else {
         console.log('Successfuly connected to Database')
       }
    }
  ),
}

import express from 'express'
import db from '../utils/db.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

// route imports
import PropertiesRoute from '../routes/PropertiesEndpoint/properties.js'
import UsersRoute from '../routes/UsersEndpoint/users.js'

// setup express standards
const app = express()
app.use(express.json())
app.use(cors())
// invoke database connection
db.connect()

app.use('/properties', PropertiesRoute)
app.use('/users', UsersRoute)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})

export default app

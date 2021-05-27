import express from 'express'
import userModel from '../../models/UsersModel/users.model.js'
import bcrypt from 'bcryptjs'
import { generateAccessToken } from '../../utils/tokencontroller.js'

const router = express.Router()

// create new user endpoint
router.post('/create_user', (req, res) => {
  const { user_name, password } = req.body
  //  checks if the user name does exists
  userModel
    .findOne({ user_name })
    .then((user) => {
      if (user) {
        return res.status(200).json({ code: 4009, message: 'User name already exists.' })
      }
    })
    .catch((erroror) => {
      res.status(200).json({
        code: 4000,
        message: erroror.message || 'Oops, Something went wrong',
      })
    })
  const hashedValue = bcrypt.hashSync(password, 10)
  const newUser = new userModel({
    user_name: user_name,
    password: hashedValue,
  })
  newUser
    .save()
    .then((data) => {
      res.status(200).json({
        data: data,
        code: 2000,
        message: 'User created successfuly',
      })
    })
    .catch((erroror) => {
      res.status(200).json({
        code: 4000,
        message: erroror.message || 'Oops, Something went wrong',
      })
    })
})

// login endpoint
router.post('/login', (req, res) => {
  const { user_name, password } = req.body
  userModel
    .findOne({ user_name })
    .then((user) => {
      if (!user) {
        return res.status(200).json({
          code: 4009,
          message: 'User does not exists!',
        })
      }
      // if user exist then we compare password
      bcrypt
        .compare(password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            // if compared matches we signed the returned user
            const data = {
              id: user._id,
              user_name: user.user_name,
            }
            const authToken = generateAccessToken(data)
            res.status(200).json({
              token: authToken,
              data: {
                user: user,
              },
              code: 2000,
              message: 'Login Success!',
            })
          } else {
            res.status(200).json({
              code: 4001,
              message: 'Password Incorrect',
            })
          }
        })
        .catch((error) => {
          res.status(200).json({
            code: 4000,
            message: 'Bcrypt error',
          })
          console.log(error)
        })
    })
    .catch((error) => {
      res.status(200).json({
        code: 4000,
        message: error || 'Oops, Something went wrong.',
      })
    })
})

export default router

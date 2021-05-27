import express from 'express'
import propertiesModel from '../../models/propertiesModel/properties.model.js'
import { authenticateToken } from '../../utils/tokencontroller.js'
const router = express.Router()

// get all propertyData
router.get('/', authenticateToken, (req, res) => {
  propertiesModel
    .find()
    .then((data) => {
      res.status(200).json({
        code: 2000,
        properties: data,
        message: 'Success!',
      })
    })
    .catch((error) => {
      res.status(200).json({
        code: 4000,
        message: error || 'Oops, Something went wrong',
      })
    })
})

// get propertyData by ID
router.get('/:id', authenticateToken, (req, res) => {
  propertiesModel
    .findOne({ propertyId: req.params.id })
    .then((data) => {
      res.status(200).json({
        code: 2000,
        property: data,
        message: 'Success!',
      })
    })
    .catch((error) => {
      res.status(200).json({
        code: 4000,
        message: error.message || 'Oops, Something went wrong',
      })
    })
})

// create new property requires authentication token
router.post('/new_property', authenticateToken, (req, res) => {
  const { propertyId, propertyName, income, expense } = req.body
  propertiesModel
    .findOne({ propertyId })
    .then((exists) => {
      if (exists) {
        return res.status(200).json({
          code: 2009,
          message: 'Property ID Exists!',
        })
      }
    })
    .catch((error) => {
      res.status(200).json({
        code: 4009,
        message: error || 'Oops, Something went wrong',
      })
    })

  const newProperty = new propertiesModel({
    propertyId: propertyId,
    propertyName: propertyName,
    income: {
      ...income,
    },
    expense: {
      ...expense,
    },
  })

  newProperty
    .save()
    .then((data) => {
      res.status(200).json({
        data: data,
        code: 2000,
        message: 'Property created successfuly!',
      })
    })
    .catch((error) => {
      res.status(200).json({
        code: 4000,
        message: error || 'Oops, Something went wrong',
      })
    })
})

export default router

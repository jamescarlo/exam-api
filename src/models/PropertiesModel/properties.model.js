import mongoose from 'mongoose'

const Schema = mongoose.Schema

const propertiesSchema = new Schema({
  propertyId: {
    type: Number,
    required: true,
    unique: true,
  },
  propertyName: {
    type: String,
    required: true,
    unique: true,
  },
  income: {
    type: Object,
  },
  expense: {
    type: Object,
  },
}, { collection: 'propertyData' })

export default mongoose.model('propertyData', propertiesSchema)

const mongoose = require('mongoose')

const embedSchema = new mongoose.Schema({
  emid:{type: String, required: true, unique: true},
  title: {type: String},
  description: {type: String},
  hex_colour: {type: String},
  image: {type: String}
})

const model = mongoose.model('EmbedSchema',  embedSchema)

module.exports = model
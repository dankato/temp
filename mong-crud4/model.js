const mongoose = require('mongoose')
const Schema = mongoose.Schema();

const FruitSchema = new Schema({
    name: String,
    price: Number,
    sale: Boolean
})

modules.exports = mongoose.model('Fruit', FruitSchema)
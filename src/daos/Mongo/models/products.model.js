const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    IsActive: {
        type: Boolean,
        default: true
    }

})

productsSchema.plugin(mongoosePaginate)

const productModel = model('products', productsSchema)

module.exports = {
    productModel
}
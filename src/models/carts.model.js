const {Schema, model} = require('mongoose')

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quatity: {
                type: Number,
                default: 1
            }
        }]
    },
    atCreated: { type: Date, default: Date() },
})

cartSchema.pre('find', function () {
    this.populate('products.product')
})

const cartModel = model('carts', cartSchema)


module.exports = {
    cartModel
}
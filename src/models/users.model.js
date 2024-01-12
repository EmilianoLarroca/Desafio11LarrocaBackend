const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const usersCollection = 'Usuarios'

const userSchema = Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String
}) 

userSchema.plugin(mongoosePaginate)

const usersModel = model(usersCollection, userSchema)

module.exports = {
    usersModel
}
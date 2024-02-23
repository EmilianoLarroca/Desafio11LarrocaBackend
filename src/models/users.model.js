const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const usersCollection = 'Usuarios'

const userSchema = Schema({
    fullname: {
        type: String,
        required: true
    },
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
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    gender: String
}) 

userSchema.plugin(mongoosePaginate)

const usersModel = model(usersCollection, userSchema)

module.exports = {
    usersModel
}
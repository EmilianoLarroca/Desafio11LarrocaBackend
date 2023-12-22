const {Schema, model} = require('mongoose')

const usersCollection = 'Usuarios'

const userSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const usersModel = model(usersCollection, userSchema)

module.exports = {
    usersModel
}
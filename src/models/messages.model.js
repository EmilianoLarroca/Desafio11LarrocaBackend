const {mongoose} = require('mongoose')

const collection = "messages"

const schema = new mongoose.Schema({
    user: String,
    message: String,
    
},
{ timestamps: true }
);

const messageModel = mongoose.model(collection,schema)

module.exports = {
    messageModel
}
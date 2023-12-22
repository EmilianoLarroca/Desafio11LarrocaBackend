const {connect} = require('mongoose')

const connectDb = async () => {
    try {
        await connect('mongodb+srv://emixlarroca05:pxKdSVcgNezuW7xd@cluster0.jdsonmm.mongodb.net/ecommerce?retryWrites=true&w=majority')
            console.log('Base de dato funcionando')
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    connectDb
}

const {connect} = require('mongoose')
const { orderModel } = require('../../models/orders.model')
const dotenv = require('dotenv')
const { program } = require('../../utils/commander')
const { MongoSingleton } = require('../../utils/mongoSingleton')
const { logger } = require('../../utils/logger')

const { mode } = program.opts()
logger.info('mode config: ', mode)

dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development'
})

const configObject = {
    PORT: process.env.PORT || 4000,
    mongo_url: process.env.MONGO_URL,
    persistencia: process.env.PERSISTENCIA,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    gmail_user_app: process.env.GMAIL_USER_APP,
    gmail_pass_app: process.env.GMAIL_PASS_APP,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_atuh_token: process.env.TWILIO_ATUH_TOKEN,
    twilio_number_phone: +18062036312,
    gh_client_id: '',
    gh_client_secret: '',
}

const connectDb = async () => {
    try {
        // await connect(process.env.MONGO_URL)
            MongoSingleton.getInstance(process.env.MONGO_URL)    
        // console.log('Base de dato funcionando')

    } catch (error) {
        logger.error(error)
    }
    
}

module.exports = {
    connectDb,
    configObject
}


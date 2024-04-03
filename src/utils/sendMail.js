const nodemailer = require('nodemailer')
const { configObject } = require('../daos/config/configServer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user_app,
        pass: configObject.gmail_pass_app
    }
})

const from = 'Servicio de mensajeria del server ecommerce <emixlarroca05@gmail.com>'

const sendMail = async (destino, subject, html) => {
    return await transport.sendMail({
        //De (Quien lo envia)
        from,
        //Para (Quien lo recibe)
        to: destino,
        //Asunto
        subject,
        //Cuerpo del email
        html,
        //Imagen para enviar dentro del mail
        attachments: [{
            filename: 'GGp-36cW0AA6NtW.jpeg',
            path: __dirname + '/GGp-36cW0AA6NtW.jpeg',
            cid: 'GGp'
        }]
    })
}

module.exports = {
    sendMail
}
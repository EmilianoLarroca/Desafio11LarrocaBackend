const { Router } = require('express')
const { sendMail } = require('../../utils/sendMail')
const { sendSms } = require('../../utils/sendSms')

const router = Router()

router.get('/sendsms', (req, res) => { 
    sendSms(`Bienvenido`, {first_name: 'Emiliano', last_name: 'Larroca', phone: '+543454269074'})
    res.send('SMS enviado')
})


router.get('/sendmail', (req, res) => {
    const user = {
        email: 'emixlarroca05@gmail.com',
        first_name: 'Emiliano',
        last_name: 'Larroca'
    }
    const to = user.email
    const subject = 'Enviando un email de prueba'
    const html =    `<div>
                        <h1>Email de prueba enviado, bienvenido ${user.first_name} ${user.last_name}</h1>
                    </div>`
    sendMail(to, subject, html)
    res.send('Email enviado')

})


module.exports = router

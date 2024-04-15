const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail', // Usa el servicio de correo que prefieras
    port: 587,
    auth: {
        user: configObject.gmail_user_app,
        pass: configObject.gmail_pass_app
    }
});


let mailOptions = {
    from: 'tu-correo@gmail.com', // Debe ser el mismo que en la configuración
    to: 'destinatario@example.com', // Cambia al correo del destinatario
    subject: 'Detalle de tu compra',
    html: htmlContent // Usamos el HTML generado
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Correo enviado: %s', info.messageId);
});

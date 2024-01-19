const { Router } = require('express')
const { authetication } = require('../../middlewars/atuh.middlewars')
const { usersModel } = require('../../models/users.model')
const { createHash, isValidPassword } = require('../../utils/hashPassword')
const passport = require('passport')

const router = Router()

//REGISTER
router.post('/register', async (req, res)=>{
    const { first_name, last_name, email , password } = req.body
    if (first_name ==='' || password === "" || email === '' ) {
        return res.send('Faltan completar campos obligatorios')
    }
    
    const userFound = await usersModel.findOne({email})
    if (userFound) {
        return res.send({status: 'error', error: 'Ya existe el usuario'})
    }
    const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password)
    }
    const result = await usersModel.create(newUser)
    
    res.send({
        status: 'success',
        payload: {
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            _id: result._id
        }
    })
})


//LOGIN
router.post('/login', async (req, res)=>{
    const {email, password } = req.body
    //Similando consulta a la base de datos(harcodeado)
    if (email === '' || password === '') {
        return res.send('Todos los campos son obligatorios')
    }

    const user = await usersModel.findOne({email})
    if(!user) {
        return res.send('Email o contraseña incorrectos')
    }
    // if (password != user.password) {
    //     return res.send('Email o contraseña incorrectos')
    // }

    if(!isValidPassword(password, {password: user.password})) {
        return res.send('Email o contraseña incorrectos')
    }
        req.session.user = {
            user: user._id,
            admin: false
        }
        res.send({
            status: 'success',
            payload: 'Logueo correcto, ¡Bienvenido!'
        })
})



//-----------------------------------------------------------------------
router.get('/', (req, res)=> {
    if(req.session.counter) {
        req.session.counter ++
        res.send(`Se a visitado esta pagina ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido a ecommerce coder')
    }
    // res.send('session')
})

router.get('/current', authetication, (req, res)=>{
    res.send('info sensible')
})

//Eliminando la session
router.get('/logout', (req, res)=> {
    req.session.destroy(err=> {
        if (err) return res.send({status: 'error, error: err'})
    })
    res.send('Logout exitoso')
})

//COOKIES
//Cookie sin firma, si se modifica el valor, nos trae igualmente el objeto
// router.get('/setcookies', (req, res)=> {
//     res.cookie('coderCookie', 'Esta es una cookie', {maxAge: 100000000*24}).send('cookies')
// })

// //Cookie firmada, donde si se modifica el valor, nos trae un objeto vacio
// router.get('/setcookiesfirmada', (req, res)=> {
//     res.cookie('signedCookie', 'Esta es una cookie', {maxAge: 100000000*24, signed:true}).send('cookies')
// })

// router.get('/getcookies', (req, res)=> {
//     console.log(req.cookies)
//     req.sed('req.cookies')
// })

// router.get('/getcookiesfirmada', (req, res)=> {
//     //cookie firmada
//     res.send('req.signedCookies')
//     console.log(req.signedCookies)
// })

// router.get('/deletecookies', (req, res)=> {

//     res.clearCookie('coderCookie').send('delete cookies')
// })

//PASSPORT-------------------------------------------------------------------------------

//Rutas de Passport

//Register
// router.post('register', passport.authenticate('register', {failregister: '/api/sessions/failregister'}))

// router.get('/failregister', (req, res) => {
//     console.log('Fail Strategy')
//     res.send({
//         status: error, 
//         error: 'Fialed'})
// })

//Login
// router.post('login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin'}), async (req, res)=> {
//     if(!req.user) return res.status(400).send({
//         status: 'error', 
//         error: 'Credencial invalida'
//     })
//     req.session.user = {
//         email: req.user.email,
//         first_name: req.user.first_name
//     }
//     res.send({
//         status: 'success',
//         payload: 'Login success'
//     })
// })
// router.get('/faillogin', (req, res)=> {
//     res.send({error: 'error de logueo'})
// })


module.exports = router
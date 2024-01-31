const { Router } = require('express')
const { authetication } = require('../../middlewars/atuh.middlewars')
const { usersModel } = require('../../models/users.model')
const { createHash, isValidPassword } = require('../../utils/hashPassword')
const passport = require('passport')
const { createToken, authenticationToken } = require('../../utils/jwt.js')
const { passportCall } = require('../../utils/passportCall.js')
const { authorizationJwt } = require('../../middlewars/jwtPassport.middleware.js')

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
    const token = createToken({id: result._id})
    res.cookie('token', token,{
        maxAge: 60 * 60 * 1000 *24,
        httpOnly: true
    }).json({
        status: 'success',
        message: 'Logueo correcto'
    })
})


//LOGIN
router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    //Similando consulta a la base de datos(harcodeado)
    if (email === '' || password === '') {
        return res.send('Todos los campos son obligatorios')
    }

    const user = await usersModel.findOne({email})
    if(!user) {
        return res.send('Email o contraseña incorrectos')
    }

    if(!isValidPassword(password, {password: user.password})) {
        return res.send('Email o contraseña incorrectos')
    }
    const token = createToken({id: user._id, role: user.role})
    res.cookie('token', token,{
        maxAge: 60 * 60 * 1000 *24,
        httpOnly: true
    }).json({
        status: 'success',
        message: 'Logueo correcto'
    })
})
        

router.get('/current', passportCall('jwt'), authorizationJwt('user'), (req, res)=>{
    res.send({message: 'información sensible', reqUser: req.user})
})

//Rutas de passport
router.get('/github', passport.authenticate('github', {scope: ['user: email']}), async (req, res)=> {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res)=>{
    req.session.user = req.user
    res.redirect('/')
})


//Eliminando la session
router.get('/logout', (req, res)=> {
    req.session.destroy(err=> {
        if (err) return res.send({status: 'error, error: err'})
    })
    res.send('Logout exitoso')
})




module.exports = router
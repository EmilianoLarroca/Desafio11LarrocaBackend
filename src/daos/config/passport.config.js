const passport = require('passport')
const local = require('passport-local')
// const { usersModel } = require('../../models/users.model.js')
const { createHash, isValidPassword } = require('../../utils/hashPassword.js')
const UserDaoMongo = require('../Mongo/userDaoMongo.js')


const LocalStrategy = local.Strategy
const userService = new UserDaoMongo

exports.initializePassport = () => {
    //Configurando un middleware
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const {first_name, last_name, email} = req.body
            let userFound = await userService.getUsersBy({email: username})
            if(userFound) return done(null, false)

            let newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)

        } catch (error) {
            return done('Error al crear el usuario'+error)
        }
    }))
}

//Guarda y recuperar credenciales del usuario
passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    let user = await userService.getUsersBy({_id: id})
    done(null, user)
})

passport.use('login', new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        const user = await userService.getUsersBy({email: username})
        if(!user) {
            console.log('User no existe')
            return done(null, false)
        }
        if(!isValidPassword(password, {password})) return done(null, false)
        return done(null, user)
    } catch (error) {
        return done(error)
    }
}))



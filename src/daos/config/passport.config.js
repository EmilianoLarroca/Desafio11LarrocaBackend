const passport = require('passport')
const local = require('passport-local')
// const { usersModel } = require('../../models/users.model.js')
// const { createHash, isValidPassword } = require('../../utils/hashPassword.js')
const UserDaoMongo = require('../Mongo/userDaoMongo.js')
const GithubStrategy = require('passport-github2')
const jwt = require('passport-jwt')

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const userService = new UserDaoMongo()

exports.initializePassport = () => {
    //Metodo para extraer el token
    const cookieExtractor = req => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['token']
        }
        return token
        
    }
    // una estrategia es un middleware

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'CoderSecretoJsonWebToken'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))


    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.df6f879cafe5d467',
        clientSecret: 'f444a27b2b42b604b424f8a1f2cda01b69214913',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=> {
        try {
            console.log(profile)
            let user = await userService.getBy({email: profile._json.email})
            if(!user) {
                let userNew = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: '1234'
                }
                let result = await userService.createUser(userNew)
                return done(null, result)
            }
            done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

//Guarda y recuperar credenciales del usuario
passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    let user = await userService.getUsersBy({_id: id})
    done(null, user)
    })
}

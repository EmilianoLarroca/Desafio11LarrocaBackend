const { usersService } = require('../repositories/servicesUser.js')
const CustomError = require('../services/errores/customError.js')
const { Errors } = require('../services/errores/enums.js')
const { generateUserErrorInfo } = require('../services/errores/generateUserErrorInfo.js')
const { logger } = require('../utils/logger.js')

class UserController {
    constructor(){
        this.usersService = usersService
    }


//GET
getUsers = async (req, res) => {
    try {
        const users = await this.usersService.getUsers()
        res.send(users)
    } catch(error) {
        logger.info(error)
    }
}

//POST
createUser = async (req, res, next) =>{
    try {
        const {first_name, last_name, email} = req.body

        // if(!first_name || !last_name || !email){
        //     CustomError.createError({
        //         name: 'Error en la creación del usuario',
        //         cause: generateUserErrorInfo({
        //             first_name,
        //             last_name,
        //             email}),
        //         message: 'Probando errores',
        //         code: Errors.INVALID_TYPES_ERROR
        //     })
        // }

        const newUser = {first_name, last_name, email, password}
        logger.info(newUser)
        const result = await this.usersService.createUser({newUser})
        res.status(201).send({ 
            status: 'success',
            payload: result 
        })
    } catch (error) {
        next(error)
    }
   
}

updateUser = async (req, res) =>{

    const { uid } = req.params
    const userToReplace = req.body
     // venga el id

    const result = await this.usersService.updateUser({_id: uid}, userToReplace)
        
    res.status(201).send({ 
        status: 'success',
        payload: result 
    })
}

deleteUser = async (req, res)=> {
    const { uid } = req.params

   const result = await this.usersService.deleteUser({_id: uid})
    res.status(200).send({ 
        status: 'success',
        payload: result
        })
    }
}


module.exports = UserController
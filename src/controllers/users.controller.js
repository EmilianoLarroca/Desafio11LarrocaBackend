const { usersService } = require('../repositories/servicesUser.js')

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
        console.log(error)
    }
}

//POST
createUser = async (req, res) =>{
    try {
        const {first_name, last_name, email} = req.body

        const newUser = {first_name, last_name, email, password}
        console.log(newUser)
        const result = await this.usersService.createUser({newUser})
        res.status(201).send({ 
            status: 'success',
            payload: result 
        })
    } catch (error) {
        console.log(error)
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
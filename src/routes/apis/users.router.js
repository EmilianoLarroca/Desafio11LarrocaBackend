const { Router } = require('express')
const { usersModel } = require('../../models/users.model')

const router = Router()

//http://localhost:8080/views/users?numPage=1 (Asi se ve la paginacion)
router.get('/', async (req, res) =>{
    try {
        
        // const users = await usersModel.find({}).explain('executionStats')
        //Filtrar cantidad de usuarios
        // const users = await usersModel.find({}).limit(50)

        //Filtrando usuarios femeninos y paginando (limitando 50 usuarios, posicionandose en la pagina 1)
        const users = await usersModel.paginate({gender: 'Female'}, {limit: 50, page: 1})
        res.send(users)
    } catch(error) {
        console.log(error)
    }
    
})


// POST localhost:8080  /api/users /
router.post('/', async (req, res) =>{
    try {
        const {first_name, last_name, email} = req.body
        const result = await usersModel.create({
            first_name,
            last_name,
            email,
            gender
        })
        res.status(201).send({ 
            status: 'success',
            payload: result 
        })
    } catch (error) {
        console.log(error)
    }
   
})
// PUT localhost:8080  /api/users /:uid
router.put('/:uid', async (req, res) =>{

    const { uid } = req.params
    const userToReplace = req.body
     // venga el id

    const result = await usersModel.updateOne({_id: uid}, userToReplace)
        
    res.status(201).send({ 
        status: 'success',
        payload: result 
    })
})

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', async (req, res)=> {
    const { uid } = req.params

   const result = await usersModel.deleteOne({_id: uid})
    res.status(200).send({ 
        status: 'success',
        payload: result
     })
})

module.exports = router
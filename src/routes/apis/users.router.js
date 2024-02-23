const { Router } = require('express')
//const { usersModel } = require('../../models/users.model')
//const UserDaoMongo = require('../../daos/Mongo/userDaoMongo')
const UserController = require('../../controllers/users.controller')
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser} 
= new UserController

const router = Router()

//http://localhost:8080/views/users?numPage=1 (Asi se ve la paginacion)
router.get('/', getUsers)

// POST localhost:8080  /api/users /
router.post('/', createUser)

// PUT localhost:8080  /api/users /:uid
router.put('/:uid', updateUser)

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', deleteUser)

module.exports = router
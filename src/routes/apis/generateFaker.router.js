const { Router } = require('express')
const { faker } = require('@faker-js/faker')

const router = Router()

const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        departament: faker.commerce.department(),
        stock: faker.string.numeric(),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        image: faker.image.url()
    }
}

const generateUser = () => {
    let products = []
    let totalOfProducts = parseInt(faker.string.numeric(1, {bannerDigits: ['0']}))
    for (let i = 0; i < totalOfProducts; i++) {
        products.push(generateProducts())
        
    }

    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        products
    }
}

router.get('/usersGenerate', (req, res) => {
    let users = []
    //Donde dice 100, son la cantidad de usuarios que podemos generar (se puede modificar)
    for (let i = 0; i < 100; i++) {
        users.push(generateUser())
        
    }
    res.send({
        status: 'success',
        payload: users
    })
})

module.exports = router

const { UserDao } = require("../daos/factory.js");
const { UserRepository } = require("./user.repository.js");

const usersService = new UserRepository(new UserDao())

module.exports = {
    usersService
}
const {usersModel} = require('../../models/users.model.js')

class UserDaoMongo {
    constructor(){
        this.usersModel = usersModel
    }

    getUsersPaginate = async (limit=10, page=1) => await this.usersModel.paginate({}, {limit, page, lean: true})

    getUsers = async () => await this.usersModel.find({})

    getUsersBy = async (filter) => await this.usersModel.findOne(filter)

    createUser = async (newUser) => await this.usersModel.create(newUser)

    updateUser = async (uid, userUpdate) => await this.usersModel.findOneAndUpdate({_id: uid}, userUpdate)

    deleteUser = async (uid) => await this.usersModel.findOneAndDelete({_id: uid})

}

module.exports = UserDaoMongo
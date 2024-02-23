const {usersModel} = require('../../models/users.model.js')

class UserDaoMongo {
    constructor(){
        this.usersModel = usersModel
    }

    // getUsersPaginate = async (limit=10, page=1) => await this.usersModel.paginate({}, {limit, page, lean: true})

    get = async () => await this.usersModel.find({})

    getBy = async (filter) => await this.usersModel.findOne(filter)

    create = async (newUser) => await this.usersModel.create(newUser)

    update = async (uid, userUpdate) => await this.usersModel.findOneAndUpdate({_id: uid}, userUpdate)

    delete = async (uid) => await this.usersModel.findOneAndDelete({_id: uid})

}

module.exports = UserDaoMongo
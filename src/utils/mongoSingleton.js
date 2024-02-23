const {connect} = require('mongoose')

class MongoSingleton {
    static instance
    constructor(url){
        connect(url)
    }

    static getInstance (url) {
        if (this.instance) {
            console.log('Base de datos ya creada')
            return this.instance
        }
        this.instance = new MongoSingleton(url)
        console.log('Conectando a la base de datos')
        return this.instance
    }
}


module.exports = {
    MongoSingleton
}
class CartService {
    constructor(cartDao){
        this.cartDao = cartDao
    }

    async getCarts(){
        try {
            let res = await this.cartDao.getCarts()
            console.log(res)
            return res
        } catch (error) {
            return new Error(error)
        }
    } 

    async getCartById(cid){
        try {
            return await this.cartDao.getCartById(cid)           
        } catch (error) {
            return new Error(error)
        }
    } 

    async createCart(){
        try {
            return await this.cartDao.createCart()            
        } catch (error) {
            return new Error(error)
        }
    } 

    async addProductToCart(cid, product){
        try {
            return await this.cartDao.addProductToCart(cid, product)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteProductFromCart(cid, pid){
        try {
            return await this.cartDao.deleteProductFromCart(cid, pid)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteCart(cid){
        try {
            return await this.cartDao.deleteCart(cid)
        } catch (error) {
            return new Error(error)
        }
    }
   


} 

module.exports = CartService
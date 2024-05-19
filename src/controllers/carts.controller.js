const cartDao  = require("../repositories/carts.repository.js")
const { productService } = require("../repositories/servicesProduct.js")
const { logger } = require("../utils/logger.js")
// const { sendMail }  = require("../utils/sendMail.js")

class CartController {
    constructor() {
        this.cartDao = new cartDao()
        this.productService = productService
    }
    
    //  crear un nuevo carrito
    createCart = async (req, res) => {
        try {
            const cartId = await this.cartDao.createCart();
            if (cartId) {
                logger.info("El carrito se creó correctamente");
                return res.status(200).json({ status: "success", payload: cartId, message: "El carrito se creó correctamente" });
            } else {
                logger.error("No se pudo crear el carrito")
                return res.status(500).json({status: "error", message: "Error! No se pudo crear el carrito"})
            }
        } catch (error) {
            logger.error("Error al crear el carrito: ", error);
            res.status(500).json({ status: "error", message: "Error del servidor al crear o obtener el carrito." });
        }
    }


    // Obtener un carrito por su id
    getCartById = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const cart = await this.cartDao.getCartById(cid);
        
            if(cart) {
                console.log("Carrito ${cid} obtenido correctamente")
                res.send({status: "success", payload: cart, _id: cart});
            } else {
                const cartNotFoundByIdError = CustomError.createError({
                    name: 'Cart not found',
                    message: `Error! Cart con id ${cid} no encontrado en la base de datos`,
                    code: EErrors.RESOURCE_NOT_FOUND_ERROR,
                    cause: "Cart not found"
                });
                throw cartNotFoundByIdError
            }

        } catch (error) {
            console.log(`Error al obtener el carrito con Id ${cid} `, error);
            next(error)
        }
    }


    // obtener todos los carritos
    getCarts = async (req, res) => {
        try {
            const carts = await this.cartDao.getCarts()
        
            if (carts) {
                res.send({
                    status: "success", 
                    payload: carts
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Error! No se encontraron carritos."
                })
            }
        } catch (error) {
            console.log("Error al obtener los carritos", error)
            res.status(500).send({
                status: "error",
                message: "Error del servidor al obtener los carritos."
            });
        }
    }

    
    // eliminar un carrito por su id
    deleteProductFromCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const deletedCart = await this.cartDao.deleteProductFromCart(cid);
        
            if (deletedCart) {
                console.log(`Carrito con id ${cid} eliminado correctamente`)
                res.status(200).send({
                    status: "success",
                    message: "Carrito eliminado correctamente"
                });
            } else {
                console.log(`No se encontró el carrito con id ${cid} a eliminar`)
                res.status(404).send({
                    status: "error",
                    message: `No se encontró el carrito con id ${cid} a eliminar`
                });
            }
        } catch (error) {
            console.log(`Error al eliminar el carrito con id ${cid}`, error)
            res.status(500).send({
                status: "error",
                message: "Error del servidor al eliminar el carrito"
            });
        }
    }

    // agregar producto al carrito
    addProductToCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
    
            if (!cid || !pid) {
                console.log("El id del carrito o del producto no fueron proporcionados")
                return res.status(400).send({ status: "error", message: "El id del carrito o del producto no fueron proporcionados." });
            }
    
            const cart = await this.cartDao.getCartById(cid);
            const product = await this.productService.getProduct(pid); 
    
            if (!cart && !product) {
                const cartProductNotFoundError = CustomError.createError({
                    name: 'Cart and Product not found',
                    message: 'Error! No se encontró el carrito ni el producto a agregar',
                    code: EErrors.RESOURCE_NOT_FOUND_ERROR,
                    cause: 'Producto y carrito no encontrado'
                })
                throw cartProductNotFoundError

            } else if (!product) {
                const productNotFoundError = CustomError.createError({
                    name: 'Product not found',
                    message: `Error! No se encontró el producto con id ${pid}`,
                    code: EErrors.RESOURCE_NOT_FOUND_ERROR,
                    cause: 'Producto no encontrado'
                })
                throw productNotFoundError;

            } else if (!cart) {
                const cartNotFoundError = CustomError.createError({
                    name: 'Cart not found',
                    message: `Error! No se encontró el carrito con id ${cid}`,
                    code: EErrors.RESOURCE_NOT_FOUND_ERROR,
                    cause: 'Carrito no encontrado'
                });
                throw cartNotFoundError;
            }
    
            const userEmail = req.user.email;
            const isPremium = req.user.role === "premium";
            if (isPremium && product.owner === userEmail ) {
                return res.status(403).json({ success: false, message: "No puedes agregar tu propio producto al carrito."})
            }

            const existingProduct = cart.products.find(item => item.product.equals(product._id));
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: product._id, quantity: 1 });
            }
    
            const result = await this.cartService.addProductToCart(cid, cart.products);
    
            if (result) {
                req.logger.info(`El producto con id ${pid} se agregó correctamente o se actualizó la cantidad`)
                return res.status(200).send({ status: "success", message: `El producto con id ${pid} se agregó correctamente o se actualizó la cantidad.` });
            } else {
                const addToCartError = CustomError.createError({
                    name: 'Add to Cart Error',
                    message: `No se pudo agregar el producto con id ${pid} al carrito`,
                    code: EErrors.DATABASE_ERROR,
                    cause: `No se agregó el producto con id ${pid} al carrito`
                })
                throw addToCartError;
            }
        } catch (error) {
            next(error)
        }
    }

    // borrar todos los productos del carrito 
    deleteCart = async (req, res) => {
        try {
            const { cid } = req.params;

            const result = await this.cartService.deleteCart(cid);

            if (result) {
                req.logger.info(`Todos los productos del carrito con id ${cid} fueron eliminados correctamente`)
                res.status(200).send({ status: "success", message: "Todos los productos del carrito fueron eliminados correctamente." });
            } else {
                req.logger.error(`Error! No se pudieron eliminar todos los productos del carrito con id ${cid}`)
                res.status(404).send({ status: "error", message: `Error! No se pudieron eliminar todos los productos del carrito con id ${cid}` });
            }

        } catch (error) {
            req.logger.error("Error del servidor al eliminar todos los productos del carrito", error)
            res.status(500).send({ status: "error", message: "Error del servidor al eliminar todos los productos del carrito." });
        }
    }


    // eliminar un producto del carrito
    deleteProductFromCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;      
            const cart = await this.cartService.getCartById(cid);
    
            if (!cart) {
                req.logger.error(`No se encontró el carrito con id ${cid}`)
                return res.status(404).send({ status: "error", message: `No se encontró el carrito con id ${cid}` });
            }  
            
            const updatedProducts = cart.products.filter(item => !item.product.equals(pid));        
            const result = await this.cartService.addProductToCart(cid, updatedProducts);
    
            if (result) {
                req.logger.info(`Producto con id ${pid} eliminado correctamente`)
                return res.status(200).send({ status: "success", message: `Producto con id ${pid} eliminado del carrito ${cid} correctamente` });
            } else {
                req.logger.error(`Error al eliminar el producto con id ${pid} del carrito`)
                return res.status(404).send({ status: "error", message: `Error al eliminar el producto con id ${pid} del carrito ${cid}`});
            }
        } catch (error) {
            req.logger.error(`Error del servidor al eliminar el producto con id ${pid} del carrito ${cid}`, error);
            res.status(500).send({ status: "error", message: `Error del servidor al eliminar el producto con id ${pid} del carrito ${cid}` });
        }
    }

    // actualizar los productos del carrito
    updateAllProductsInCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const updatedProducts = req.body;
            
            const cart = await this.cartService.getCartById(cid);
            if (!cart) {
                const cartNotFoundError = CustomError.createError({
                    name: 'Cart not found',
                    message: `Error! No se encontró el carrito con id ${cid}.`,
                    code: EErrors.RESOURCE_NOT_FOUND_ERROR,
                    cause: 'No se encontró el carrito'
                });
                throw cartNotFoundError;
            }

            cart.products = [];
            
            for (const updatedProduct of updatedProducts) {
                const product = await this.productService.getProductById(updatedProduct.productId);
                if (!product) {
                    const productNotFoundError = CustomError.createError({
                        name: 'Product not found',
                        message: `Error! No se encontró el producto con id ${updatedProduct.productId}.`,
                        code: EErrors.RESOURCE_NOT_FOUND_ERROR,
                        cause: 'No se encontró el producto.'
                    });
                    throw productNotFoundError;
                }
                cart.products.push({ product: product._id, quantity: updatedProduct.quantity });
            }
            
            const result = await this.cartDao.updateCartProducts(cid, cart.products);
            if (result) {
                req.logger.info(`Carrito con id ${cid} actualizado correctamente`)
                return res.status(200).send({ status: "success", message: `Carrito con id ${cid} actualizado correctamente` });
            } else {
                req.logger.error(`Error! No se pudo actualizar el carrito con id ${cid}`)
                const updateCartError = CustomError.createError({
                    name: 'Update Cart Error',
                    message: `Error! No se pudo actualizar el carrito con id ${cid}`,
                    code: EErrors.DATABASE_ERROR,
                    cause: 'No se puedo actualizar el carrito'
                });
                throw updateCartError;
            }
        } catch (error) {
            next(error)
        }
    }

    // actualizar la cantidad de un producto en el carrito
    updateProductQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
    
            // Validar que la cantidad sea un número mayor o igual a cero
            if (typeof quantity !== 'number' || quantity < 0) {
                return res.status(400).send({ status: "error", message: "La nueva cantidad debe ser un número mayor o igual a 0." });
            }
    
            const result = await this.cartDao.updateProductQuantity(cid, pid, quantity);
    
            if (result) {
                req.logger.info(`Cantidad del producto con id ${pid} en el carrito ${cid} actualizada correctamente`)
                res.status(200).send({ status: "success", message: `Cantidad del producto con id ${pid} en el carrito ${cid} actualizada correctamente` });
            } else {
                req.logger.error(`Error! No se pudo actualizar la cantidad del producto con id ${pid} en el carrito ${cid}`)
                res.status(404).send({ status: "error", message: `Error! No se pudo actualizar la cantidad del producto con id ${pid} en el carrito ${cid}` });
            }
        } catch (error) {
            req.logger.error(`Error del servidor al actualizar la cantidad del producto con id ${pid} en el carrito ${cid}`)
            res.status(500).send({ status: "error", message: `Error del servidor al actualizar la cantidad del producto con id ${pid} en el carrito ${cid}` });
        }
    }     
}

module.exports = CartController
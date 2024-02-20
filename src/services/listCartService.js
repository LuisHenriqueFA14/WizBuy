const { database } = require('../database');

async function listCartService({ userId }, db = database) {
    const cart = await db.cart.findMany({
        where: {
            userId
        }
    });

    if (!cart) {
        return {
            error: {
                type: 'NotFound',
                message: 'Cart is empty'
            }
        }
    }

    let products = [];

    for (let i = 0; i < cart.length; i++) {
        const product = await db.product.findUnique({
            where: {
                id: cart[i].productId
            }
        });

        if (!product) {
            return {
                error: {
                    type: 'NotFound',
                    message: 'Product not found'
                }
            }
        }

        products.push({
            id: product.id,
            title: product.title,
            category: product.category,
            price: product.price,
            images: product.images,
            quantity: cart[i].quantity
        });
    }

    return {
        response: products
    }
}

module.exports = { listCartService };

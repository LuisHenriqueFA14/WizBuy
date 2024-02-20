const { database } = require('../database');

// product parameters format:
// {
//     id: "uuid"
//     quantity: 1
// }

async function addToCartService({ id, quantity, userId }, db = database) {
    if (!id) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Product id is required'
            }
        };
    }

    if (!quantity) {
        quantity = 1;
    }

    const productExists = await db.product.findUnique({
        where: {
            id
        }
    });

    if (!productExists) {
        return {
            error: {
                type: 'NotFound',
                message: 'Product not found'
            }
        };
    }

    const userExists = await db.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!userExists) {
        return {
            error: {
                type: 'NotFound',
                message: 'User not found'
            }
        };
    }

    const cart = await db.cart.findMany({
        where: {
            userId
        }
    });

    if (!cart) {
        cart = [];
    }

    const alreadyInCart = await db.cart.findFirst({
        where: {
            userId,
            productId: id
        }
    });

    if (alreadyInCart) {
        await db.cart.update({
            where: {
                id: alreadyInCart.id
            },
            data: {
                quantity: alreadyInCart.quantity + quantity
            }
        });
    } else {
        await db.cart.create({
            data: {
                userId,
                productId: id,
                quantity
            }
        });
    }

    return {
        response: {
            message: 'Cart updated successfully'
        }
    }
}

module.exports = { addToCartService };

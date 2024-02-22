const { database } = require('../database');

async function removeFromCartService({ id, quantity, userId }, db = database) {
    if (!id) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Product id is required'
            }
        };
    }

    if(!userId) {
        return {
            error: {
                type: 'BadRequest',
                message: 'User id is required'
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

    const cartProduct = await db.cart.findFirst({
        where: {
            userId,
            productId: id
        }
    });

    if (!cartProduct) {
        return {
            error: {
                type: 'NotFound',
                message: 'Product not found in cart'
            }
        };
    }

    if (!quantity || quantity > cartProduct.quantity) {
        await db.cart.delete({
            where: {
                id: cartProduct.id
            }
        });
    } else {
        await db.cart.update({
            where: {
                id: cartProduct.id
            },
            data: {
                quantity: cartProduct.quantity - quantity
            }
        });
    }

    return {
        response: {
            message: 'Cart updated successfully'
        }
    }
}

module.exports = { removeFromCartService };

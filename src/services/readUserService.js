const { database } = require('../database');

async function readUserService({ id }, db = database) {
    if(!id) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Id is required'
            }
        };
    }

    const user = await db.user.findUnique({
        where: {
            id
        }
    });

    if(!user) {
        return {
            error: {
                type: 'NotFound',
                message: 'User not found'
            }
        };
    }

    return {
        response: {
            id: user.id,
            name: user.name,
            cart: user.cart,
            created_at: user.created_at
        }
    };
}

module.exports = { readUserService };

const { prisma } = require('../database');

async function readUserService(id) {
    const user = await prisma.user.findUnique({
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

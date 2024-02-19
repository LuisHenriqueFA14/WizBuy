const { database } = require('../database');

async function readProductService({ id }, db = database) {
    if(!id) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Id is required'
            }
        };
    }

    const product = await db.product.findUnique({
        where: {
            id
        }
    });

    if(!product) {
        return {
            error: {
                type: 'NotFound',
                message: 'Product not found'
            }
        };
    }

    return {
        response: product
    };
}

module.exports = { readProductService };

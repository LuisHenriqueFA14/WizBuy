const { database } = require('../database');

class Product {
    constructor({ id, title, category, price, images }) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.images = images;
    }
}

async function listProductsService({ search, category }, db = database) {
    let products = await db.product.findMany({
        where: {
            title: {
                contains: search,
                mode: 'insensitive'
            },
            category: {
                contains: category,
                mode: 'insensitive'
            }
        }
    });

    products = products.map(product => new Product(product));

    if (!products) {
        return {
            error: {
                type: 'NotFound',
                message: 'Products not found'
            }
        }
    }

    return {
        response: products
    }
}

module.exports = { listProductsService };

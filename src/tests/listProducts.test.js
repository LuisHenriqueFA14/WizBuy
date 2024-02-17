const { listProductsService } = require('../services/listProductsService');
const { Db } = require('./mock');

describe('listProductsService', () => {
    test('should list products', async () => {
        const db = new Db();

        const products = [
            {
                id: '1',
                title: 'Product 1',
                category: 'Category 1',
                price: 10,
                images: ['image1.jpg', 'image2.jpg']
            },
            {
                id: '2',
                title: 'Product 2',
                category: 'Category 2',
                price: 20,
                images: ['image3.jpg', 'image4.jpg']
            }
        ]

        db.product = {
            findMany: async () => products
        }

        const { response, error } = await listProductsService({ search: null, category: null }, db);

        expect(error).toBeUndefined();
        expect(response).toBeDefined();
        expect(response).toEqual(products);
    });

    test('should return an error if no products are found', async () => {
        const db = new Db();

        db.product = {
            findMany: async () => null
        }

        const { response, error } = await listProductsService({ search: null, category: null }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toEqual('NotFound');
    });
})

const { readProductService } = require('../services/readProductService');
const { Db } = require('./mock');

describe('readProductService', () => {
    test('should return a product', async () => {
        const db = new Db();

        db.product.findUnique = (_) => ({
            name: 'Product X',
            id: 'PRODUCTXUUID'
        })

        const { response, error } = await readProductService({ id: 'PRODUCTXUUID' }, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.name).toBe('Product X');
    });

    test('should return an error if product is not found', async () => {
        const db = new Db();

        db.product.findUnique = (_) => null;

        const { response, error } = await readProductService({ id: 'PRODUCTXUUID' }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('NotFound');
    });

    test('should return an error if id is not provided', async () => {
        const db = new Db();

        const { response, error } = await readProductService({}, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('BadRequest');
    });
})

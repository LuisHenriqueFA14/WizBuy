const { listCartService } = require('../services/listCartService');
const { Db } = require('./mock');

describe('listCartService', () => {
    test('should list cart', async () => {
        const userId = 'USERUUID';

        const db = new Db();

        db.product.findUnique = (_) => true;
        db.cart.findMany = (_) => [
            {
                id: 'CARTUUID1',
                userId,
                productId: 'PRODUCTUUID1',
                quantity: 2
            },
            {
                id: 'CARTUUID2',
                userId,
                productId: 'PRODUCTUUID2',
                quantity: 3
            }
        ]

        const { response, error } = await listCartService({ userId }, db);

        expect(error).toBeUndefined();
        expect(response).toBeDefined();
    });

    test('should return an error if cart is empty', async () => {
        const userId = 'USERUUID';

        const db = new Db();

        db.cart.findMany = (_) => false;

        const { response, error } = await listCartService({ userId }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toEqual('NotFound');
    });

    // product does not exist
    test('should return an error if product does not exist', async () => {
        const userId = 'USERUUID';

        const db = new Db();

        db.product.findUnique = (_) => false;
        db.cart.findMany = (_) => [
            {
                id: 'CARTUUID1',
                userId,
                productId: 'PRODUCTUUID1',
                quantity: 2
            },
            {
                id: 'CARTUUID2',
                userId,
                productId: 'PRODUCTUUID2',
                quantity: 3
            }
        ]

        const { response, error } = await listCartService({ userId }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toEqual('NotFound');
    });
})

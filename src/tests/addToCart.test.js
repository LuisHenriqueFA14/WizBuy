const { addToCartService } = require('../services/addToCartService');
const { Db } = require('./mock');

describe('addToCartService', () => {
    test('should add product to cart', async () => {
        const userId = 'USERUUID';
        const id = 'PRODUCTUUID';
        const quantity = 1;

        const db = new Db();

        db.product.findUnique = (_) => true;
        db.user.findUnique = (_) => true;
        db.cart.findFirst = (_) => false;
        db.cart.create = (_) => true;

        const { response, error } = await addToCartService({ id, quantity, userId }, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.message).toBe('Cart updated successfully');
    });

    test('should return an error if product is not found', async () => {
        const userId = 'USERUUID';
        const id = 'PRODUCTUUID';
        const quantity = 1;

        const db = new Db();

        db.product.findUnique = (_) => false;

        const { response, error } = await addToCartService({ id, quantity, userId }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('NotFound');
    });

    test('should return an error if user is not found', async () => {
        const userId = 'USERUUID';
        const id = 'PRODUCTUUID';
        const quantity = 1;

        const db = new Db();

        db.product.findUnique = (_) => true;
        db.user.findUnique = (_) => false;

        const { response, error } = await addToCartService({ id, quantity, userId }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('NotFound');
    });

    test('should increase quantity if product is already in cart', async () => {
        const userId = 'USERUUID';
        const id = 'PRODUCTUUID';
        const quantity = 1;

        const db = new Db();

        db.product.findUnique = (_) => true;
        db.user.findUnique = (_) => true;
        db.cart.findFirst = (_) => true;
        db.cart.update = (_) => true;

        const { response, error } = await addToCartService({ id, quantity, userId }, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.message).toBe('Cart updated successfully');
    });
});

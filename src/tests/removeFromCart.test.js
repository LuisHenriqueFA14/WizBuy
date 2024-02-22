const { removeFromCartService } = require('../services/removeFromCartService');
const { Db } = require('./mock');

describe('removeFromCartService', () => {
    test('should remove product from cart', async () => {
        const userId = 'USERUUID';
        const id = 'PRODUCTUUID';

        const db = new Db();

        db.product.findUnique = (_) => true;
        db.user.findUnique = (_) => true;
        db.cart.findFirst = (_) => true;
        db.cart.delete = (_) => true;

        const { response, error } = await removeFromCartService({ id, userId }, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.message).toBe('Cart updated successfully');
    });

    test('should return an error if product id is not provided', async () => {
        const userId = 'USERUUID';

        const db = new Db();

        const { response, error } = await removeFromCartService({ userId, id: false }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('BadRequest');
    });

    test('should return an error if product is not found', async () => {
       const userId = 'USERUUID';
       const id = 'PRODUCTUUID';

       const db = new Db();

       db.product.findUnique = (_) => false;

       const { response, error } = await removeFromCartService({ id, userId }, db);

       expect(response).toBeUndefined();
       expect(error).toBeDefined();
       expect(error.type).toBe('NotFound');
    });

    test('should return an error if user is not found', async () => {
       const userId = 'USERUUID'; 
       const id = 'PRODUCTUUID';

       const db = new Db();

       db.product.findUnique = (_) => true;
       db.user.findUnique = (_) => false;

       const { response, error } = await removeFromCartService({ id, userId }, db);

       expect(response).toBeUndefined();
       expect(error).toBeDefined();
       expect(error.type).toBe('NotFound');
    });

    test('should return an error if product is not in cart', async () => {
        const userId = 'USERUUID';
        const id = 'PRODUCTUUID';

        const db = new Db();

        db.product.findUnique = (_) => true;
        db.user.findUnique = (_) => true;
        db.cart.findFirst = (_) => false;

        const { response, error } = await removeFromCartService({ id, userId }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('NotFound');
    });

    test('should decrease quantity if product is already in cart', async () => {
        const userId = 'USERUUID';
        const id = 'PRODUCTUUID';
        const quantity = 1;

        const db = new Db();

        db.product.findUnique = (_) => true;
        db.user.findUnique = (_) => true;
        db.cart.findFirst = (_) => {
            return {
                quantity: 2
            }
        }
        db.cart.update = (_) => true;
        db.cart.delete = (_) => false;

        const { response, error } = await removeFromCartService({ id, quantity, userId }, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.message).toBe('Cart updated successfully');
    });
})

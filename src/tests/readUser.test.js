const { readUserService } = require('../services/readUserService');
const { Db } = require('./mock');

describe('readUserService', () => {
    test('should return a user', async () => {
        const db = new Db();

        db.user.findUnique = (_) => ({
            name: 'John Doe',
            id: 'JOHNDOEUUID',
            cart: []
        });

        const { response, error } = await readUserService({ id: 'JOHNDOEUUID' }, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.name).toBe('John Doe');
    });

    test('should return an error if user is not found', async () => {
        const db = new Db();

        db.user.findUnique = (_) => null;

        const { response, error } = await readUserService({ id: 'JOHNDOEUUID' }, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('NotFound');
    });
})

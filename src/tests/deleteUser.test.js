const { deleteUserService } = require('../services/deleteUserService');
const { Db } = require('./mock');
const bcrypt = require('bcrypt');

describe('deleteUserService', () => {
    test('should delete a user', async () => {
        const user = {
            password: 'password',
            userId: '123'
        }

        const db = new Db();

        db.user.findFirst = (_) => ({
            name: 'John Doe',
            password: 'hashedpassword',
        });

        db.user.delete = (_) => true;

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

        const { response, error } = await deleteUserService(user, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.message).toBe('User deleted successfully');
    });

    test('should return an error if password is missing', async () => {
        const user = {
            userId: '123'
        }

        const db = new Db();

        const { response, error } = await deleteUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('BadRequest');
    });

    test('should return an error if password is wrong', async () => {
        const user = {
            password: 'password',
            userId: '123'
        }

        const db = new Db();

        db.user.findFirst = (_) => ({
            name: 'John Doe',
            password: 'hashedpassword',
        });

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

        const { response, error } = await deleteUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('Unauthorized');
    });
    
    test('should return an error if user is not found', async () => {
        const user = {
            password: 'password',
            userId: '123'
        }

        const db = new Db();

        db.user.findFirst = (_) => undefined;

        const { response, error } = await deleteUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('NotFound');
    });

    test('should return an error if there is an internal server error', async () => {
        const user = {
            password: 'password',
            userId: '123'
        }

        const db = new Db();

        db.user.findFirst = (_) => ({
            name: 'John Doe',
            password: 'hashedpassword',
        });

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

        db.user.delete = (_) => false;

        const { response, error } = await deleteUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('InternalServerError');
    });
})

const { updateUserService } = require('../services/updateUserService');
const { Db } = require('./mock');
const bcrypt = require('bcrypt');

describe('updateUserService', () => {
    test('should update a user', async () => {
        const user = {
            name: 'John Doe',
            password: 'password',
            userId: '123'
        }

        const db = new Db();

        db.user.findFirst = (_) => ({
            name: 'John Doe',
            password: 'hashedpassword',
        });

        db.user.update = (_) => ({
            message: 'User updated successfully',
            id: '123'
        });

        const { response, error } = await updateUserService(user, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.message).toBe('User updated successfully');
    });

    test('should return an error if user is not found', async () => {
        const user = {
            name: 'John Doe',
            password: 'password',
            userId: '123'
        }

        const db = new Db();

        const { response, error } = await updateUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('NotFound');
    });
    
    test('should return an error if any parameter is missing or is invalid', async () => {
        const user = {
            userId: '123'
        }

        const db = new Db();

        const { response, error } = await updateUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('BadRequest');
    });

    test('should return an error if new password is invalid', async () => {
        const user = {
            name: 'John Doe',
            password: 'pass',
            userId: '123'
        }

        const db = new Db();

        db.user.findFirst = (_) => ({
            name: 'John Doe',
            password: 'hashedpassword',
        });

        const { response, error } = await updateUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('BadRequest');
    });

    test('should return an error if it cannot hash the new password', async () => {
        const user = {
            name: 'John Doe',
            password: 'password',
            userId: '123'
        }

        const db = new Db();

        db.user.findFirst = (_) => ({
            name: 'John Doe',
            password: 'hashedpassword',
        });

        jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
            return false;
        });

        const { response, error } = await updateUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('InternalServerError');
    });

    test('should return an error if it cannot update the user', async () => {
        const user = {
            name: 'John Doe',
            password: 'password',
            userId: '123'
        }

        const db = new Db();

        db.user.findFirst = (_) => ({
            name: 'John Doe',
            password: 'hashedpassword',
        });

        db.user.update = (_) => {
            return false;
        };

        const { response, error } = await updateUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('InternalServerError');
    });
})

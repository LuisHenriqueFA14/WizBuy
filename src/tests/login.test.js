const { loginService } = require('../services/loginService');
const { Db } = require('./mock');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('loginService', () => {
    test('should login a user', async () => {
        const user = {
            email: 'johndoe@gmail.com',
            password: 'password'
        }

        const db = new Db();

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return true;
        });

        db.user.findFirst = (_) => ({
            password: 'password',
            id: 'JOHNDOEUUID',
        });

        const { response, error } = await loginService(user, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.token).toBeDefined();
    });

    test('should return an error if any parameter is missing or is invalid', async () => {
        const invalidUsers = [
            { email: 'johndoe@gmail.com' },
            { password: 'password' },
        ];

        const db = new Db();

        for (user of invalidUsers) {
            const { response, error } = await loginService(user, db);

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.type).toBe('BadRequest');
        }
    });

    test('should return an error if user is not found', async () => {
        const user = {
            email: 'johndoe@gmail.com',
            password: 'password'
        }

        const db = new Db();

        db.user.findFirst = (_) => null;

        const { response, error } = await loginService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('NotFound');
    });

    test('should return an error if password is incorrect', async () => {
        const user = {
            email: 'johndoe@gmail.com',
            password: 'wrongpassword'
        }

        const db = new Db();

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return false;
        });

        db.user.findFirst = (_) => ({
            password: 'password',
            id: 'JOHNDOEUUID',
        });

        const { response, error } = await loginService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('BadRequest');
    });

    test('should return an error if there is an internal server error', async () => {
        const user = {
            email: 'johndoe@gmail.com',
            password: 'password'
        }

        const db = new Db();

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return true;
        });

        db.user.findFirst = (_) => ({
            password: 'password',
            id: 'JOHNDOEUUID',
        });

        jest.spyOn(jwt, 'sign').mockImplementation(() => {
            return false;
        })

        const { response, error } = await loginService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('InternalServerError');
    });
})

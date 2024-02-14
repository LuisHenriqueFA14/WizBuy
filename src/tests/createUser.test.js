const { createUserService } = require('../services/createUserService');
const { Db } = require('./mock');
const bcrypt = require('bcrypt');

describe('createUserService', () => {
    test('should create a new user', async () => {
        const user = {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password'
        };

        const db = new Db();

        const { response, error } = await createUserService(user, db);

        expect(response).toBeDefined();
        expect(error).toBeUndefined();
        expect(response.message).toBe('User created successfully');
    });

    test('should return an error if any parameter is missing or is invalid', async () => {
        const invalidUsers = [
            { name: 'John Doe', email: 'johndoe@gmail.com' },
            { name: 'John Doe', password: 'password' },
            { email: 'johndoe@gmail.com', password: 'password' },
            { name: 'John Doe', email: 'johndoe@gmailcom', password: 'password' },
            { name: 'John Doe', email: 'johndoe@gmail.com', password: 'pass' },
        ];

        const db = new Db();

        for (user of invalidUsers) {
            const { response, error } = await createUserService(user, db);

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.type).toBe('BadRequest');
        }
    });

    test('should return an error if email is already in use', async () => {
        const user = {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password'
        };

        const db = new Db();

        db.user.findFirst = (_) => true;

        const { response, error } = await createUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('BadRequest');
    });

    test('should return an error if there is an internal server error', async () => {
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
            return false;
        });

        const user = {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password'
        }

        const db = new Db();

        const { response, error } = await createUserService(user, db);

        expect(response).toBeUndefined();
        expect(error).toBeDefined();
        expect(error.type).toBe('InternalServerError');
    })
})

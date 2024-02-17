const { ensureAuthentication } = require('../middlewares/ensureAuthentication');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');

describe('ensureAuthentication', () => {
    test('should return userId from token', async () => {
        const id = '123';

        dotenv.config();
        const token = jsonwebtoken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        await ensureAuthentication({
            headers: {
                authorization: `Bearer ${token}`
            }
        }, (ctx) => {
            expect(ctx.userId).toBe(id); 
        });
    });

    test('should return an error if token is missing', async () => {
        await ensureAuthentication({
            headers: {}
        }, (ctx) => {
            expect(ctx.status).toBe(401);
            expect(ctx.body.error.type).toBe('Unauthorized');
        });
    });

    test('should return an error if token is invalid', async () => {
        await ensureAuthentication({
            headers: {
                authorization: `Bearer invalidToken`
            }
        }, (ctx) => {
            expect(ctx.status).toBe(401);
            expect(ctx.body.error.type).toBe('Unauthorized');
        });
    });
})

const jsonwebtoken = require('jsonwebtoken');

async function ensureAuthentication(ctx, next) {
    const token = ctx.headers.authorization.split(' ')[1];

    if (!token) {
        ctx.status = 401;
        ctx.body = {
            error: {
                type: 'Unauthorized',
            }
        }

        return;
    }
    
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        ctx.userId = decoded;

        await next();
    } catch (error) {
        ctx.status = 401;
        ctx.body = {
            error: {
                type: 'Unauthorized',
            }
        }

        return;
    }
}

module.exports = { ensureAuthentication };

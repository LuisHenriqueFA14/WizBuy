const jsonwebtoken = require('jsonwebtoken');

async function ensureAuthentication(ctx, next) {
    let token = ctx.headers.authorization;

    if (!token) {
        ctx.status = 401;
        ctx.body = {
            error: {
                type: 'Unauthorized',
            }
        }

        return;
    }

    token = token.replace('Bearer ', '');
    
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        ctx.userId = decoded.id;
    } catch (error) {
        ctx.status = 401;
        ctx.body = {
            error: {
                type: 'Unauthorized',
            }
        }

        return;
    }

    await next(ctx);
}

module.exports = { ensureAuthentication };

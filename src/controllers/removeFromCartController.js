const { removeFromCartService } = require('../services/removeFromCartService');
const { errorToHttp } = require('../errors/errorToHttp');

async function removeFromCartController(ctx) {
    const { userId } = ctx;
    const { id, quantity } = ctx.request.body;

    const { response, error } = await removeFromCartService({ id, quantity, userId });

    if (error) {
        const code = errorToHttp(error);

        ctx.status = code;
        ctx.body = {
            message: error.message
        };

        return;
    }

    ctx.status = 200;
    ctx.body = response;
}

module.exports = { removeFromCartController };

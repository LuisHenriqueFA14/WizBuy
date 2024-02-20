const { addToCartService } = require('../services/addToCartService');
const { errorToHttp } = require('../errors/errorToHttp');

async function addToCartController(ctx) {
    const { userId } = ctx;
    const { id, quantity } = ctx.request.body;

    const { response, error } = await addToCartService({ id, quantity, userId });

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

module.exports = { addToCartController };

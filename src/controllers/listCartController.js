const { listCartService } = require('../services/listCartService');
const { errorToHttp } = require('../errors/errorToHttp');

async function listCartController(ctx) {
    const { userId } = ctx;

    const { response, error } = await listCartService({ userId });

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

module.exports = { listCartController };

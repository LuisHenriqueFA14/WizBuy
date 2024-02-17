const { listProductsService } = require('../services/listProductsService');
const { errorToHttp } = require('../errors/errorToHttp');

async function listProductsController(ctx) {
    const search = ctx.query.s;
    const category = ctx.query.c;

    const { response, error } = await listProductsService({ search, category });

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

module.exports = { listProductsController };

const { readProductService } = require('../services/readProductService');
const { errorToHttp } = require('../errors/errorToHttp');

async function readProductController(ctx) {
    const id = ctx.query.id;

    const { response, error } = await readProductService({ id });

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

module.exports = { readProductController };

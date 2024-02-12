const { readUserService } = require('../services/readUserService');
const { errorToHttp } = require('../errors/errorToHttp');

async function readUserController(ctx) {
    const id = ctx.query.id;

    const { response, error } = await readUserService(id);

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

module.exports = { readUserController };

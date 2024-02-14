const { createUserService } = require('../services/createUserService');
const { errorToHttp } = require('../errors/errorToHttp');

async function createUserController(ctx) {
    const { name, email, password } = ctx.request.body;

    const { response, error } = await createUserService({ name, email, password });

    if (error) {
        const code = errorToHttp(error);

        ctx.status = code;
        ctx.body = {
            message: error.message
        };

        return;
    }

    ctx.status = 201;
    ctx.body = response;
}

module.exports = { createUserController };

const { updateUserService } = require('../services/updateUserService');
const { errorToHttp } = require('../errors/errorToHttp');

async function updateUserController(ctx) {
    const { name, password } = ctx.request.body;
    const { userId } = ctx;

    const { response, error } = await updateUserService({ name, password, userId });

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

module.exports = { updateUserController };

const { deleteUserService } = require('../services/deleteUserService');
const { errorToHttp } = require('../errors/errorToHttp');

async function deleteUserController(ctx) {
    const { password } = ctx.request.body;
    const { userId } = ctx;

    const { response, error } = await deleteUserService({ password, userId });

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

module.exports = { deleteUserController };

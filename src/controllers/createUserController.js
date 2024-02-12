const { createUserService } = require('../services/createUserService');
const { errorToHttp } = require('../errors/errorToHttp');

async function createUserController(ctx) {
    const { name, email, password } = ctx.request.body;

    const { response, error } = await createUserService(name, email, password);

    if (error) {
        const code = errorToHttp(error);

        return {
            code,
            body: {
                message: error.message
            }
        };
    }

    return {
        code: 201,
        body: response
    };
}

module.exports = { createUserController };

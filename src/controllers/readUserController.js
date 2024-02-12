const { readUserService } = require('../services/readUserService');

async function readUserController(ctx) {
    const id = ctx.query.id;

    const { response, error } = await readUserService(id);

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
        code: 200,
        body: response
    };
}

module.exports = { readUserController };

const { loginService } = require('../services/loginService');
const { errorToHttp } = require('../errors/errorToHttp');

async function loginController(ctx) {
    const { email, password } = ctx.request.body;

    const { response, error } = await loginService({ email, password });

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

module.exports = { loginController };

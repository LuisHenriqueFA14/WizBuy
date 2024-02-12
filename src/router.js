const { createUserController } = require('./controllers/createUserController');
const { readUserController } = require('./controllers/readUserController');
const { loginController } = require('./controllers/loginController');

async function router(ctx) {
    switch (`${ctx.method} ${ctx.path}`) {
        case ('POST /user'):
            await createUserController(ctx);
            break;
        case ('GET /user'):
            await readUserController(ctx);
            break;
        case ('POST /login'):
            await loginController(ctx);
            break;
        default:
            ctx.body = 'Hello World!';
            break;
    }
}

module.exports = { router };

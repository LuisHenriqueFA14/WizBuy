const { createUserController } = require('./controllers/createUserController');
const { readUserController } = require('./controllers/readUserController');

async function router(ctx) {
    switch (`${ctx.method} ${ctx.path}`) {
        case ('POST /user'):
            ctx.body = await createUserController(ctx);
            break;
        case ('GET /user'):
            ctx.body = await readUserController(ctx);
            break;
        default:
            ctx.body = 'Hello World!';
            break;
    }
}

module.exports = { router };

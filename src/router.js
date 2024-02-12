const { createUserController } = require('./controllers/createUserController');

async function router(ctx) {
    switch (`${ctx.method} ${ctx.path}`) {
        case ('POST /user'):
            ctx.body = await createUserController(ctx);
            break;
        default:
            ctx.body = 'Hello World!';
            break;
    }
}

module.exports = { router };

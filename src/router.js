const { createUserController } = require('./controllers/createUserController');
const { readUserController } = require('./controllers/readUserController');
const { loginController } = require('./controllers/loginController');
const { updateUserController } = require('./controllers/updateUserController');
const { deleteUserController } = require('./controllers/deleteUserController');
const { listProductsController } = require('./controllers/listProductsController');
const { readProductController } = require('./controllers/readProductController');
const { addToCartController } = require('./controllers/addToCartController');

const { ensureAuthentication } = require('./middlewares/ensureAuthentication');

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
        case ('PUT /user'):
            await ensureAuthentication(ctx, updateUserController);
            break;
        case ('DELETE /user'):
            await ensureAuthentication(ctx, deleteUserController);
            break;
        case ('GET /products'):
            await listProductsController(ctx);
            break;
        case ('GET /product'):
            await readProductController(ctx);
            break;
        case ('POST /cart'):
            await ensureAuthentication(ctx, addToCartController);
            break;
        default:
            ctx.body = 'Hello World!';
            break;
    }
}

module.exports = { router };

const koa = require('koa');

require('dotenv').config();

const app = new koa();

app.use(ctx => {
    ctx.body = 'Hello World!';
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
});

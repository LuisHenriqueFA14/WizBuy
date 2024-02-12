const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
require('dotenv').config();

const { router } = require('./router');

const port = process.env.PORT || 3000;

const app = new koa();

app.use(bodyparser());
app.use(json());

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port || 3000}`);
});

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors');
const auth = require('./app/middleware/auth');
const logger = require('./app/middleware/logger')


const router = require('./app/router')

app.use(bodyParser());
app.use(cors({
    origin: "*"
}));
app.use(logger());
app.use(auth());
app.use(router);

app.listen(3000, () => console.log('listening on to http://localhost:3000'));
const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = new Router();
const server = new Koa();

require('./routes')(router);
require("./mongodb")();

server
    .use(cors()) //#TODO set origin for production
    .use(bodyParser())
    .use(logger('tiny'))
    .use(router.routes())
    .use(router.allowedMethods());


module.exports = server;
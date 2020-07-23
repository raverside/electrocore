const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const router = new Router();
const server = new Koa();

require('./routes')(router);


server
    .use(logger('tiny'))
    .use(router.routes())
    .use(router.allowedMethods());


module.exports = server;
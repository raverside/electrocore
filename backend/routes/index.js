module.exports = (router) => {
    router.use(require('./AuthRouter'), require('./NodesRouter'));
};
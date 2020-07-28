const auth = require("../middleware/Auth");

module.exports = (router) => {
    router.use(require('./AuthRouter'));
    router.use(auth, require('./UsersRouter'));
    router.use(auth, require('./NodesRouter'));
};
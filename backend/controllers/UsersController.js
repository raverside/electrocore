const User = require('../models/User');

class NodesController {

    static async getUser(ctx) {
        const user = await User.findOne({ _id: ctx.decode.id });

        ctx.body = user;
    }

}

module.exports = NodesController;
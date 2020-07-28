const UserService = require('../services/UserService');

class UsersController {

    /**
     * Return currently authenticated user
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async getUser(ctx) {
        ctx.body = await UserService.getUserById(ctx.decode.id);
    }

}

module.exports = UsersController;
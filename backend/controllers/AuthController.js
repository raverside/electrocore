const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

class AuthController {

    /**
     * Create a new user and authenticate them
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async register(ctx) {
        try {
            const hash = await AuthService.hashPassword(ctx.request.body.password);
            const newUser = await UserService.register(ctx.request.body.username, hash);
            const token = await AuthService.getToken(newUser._id);

            ctx.body = {
                username: newUser.username,
                currency: newUser.currency,
                nodes: newUser.nodes,
                token: token
            };
        } catch (err) {
            ctx.throw(403, {error: err});
        }
    }

    /**
     * Authenticate the user
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async login(ctx) {
        try {
            const user = await UserService.getUserByName(ctx.request.body.username);
            if (!user) {
                ctx.throw(500, "User with that name doesn't exist");
            } else {
                const comparison = await AuthService.comparePassword(ctx.request.body.password, user.password);

                if (comparison) {
                    const token = await AuthService.getToken(user._id);
                    const profits = await UserService.collectOfflineProfits(user);
                    const newCurrency = user.currency + profits;

                    ctx.body = {
                        username: user.username,
                        currency: newCurrency,
                        nodes: user.nodes,
                        token: token,
                        offline_profits: profits
                    };
                } else {
                    ctx.throw(403, "Wrong password");
                }
            }
        } catch (err) {
            console.log(err);
            ctx.throw(403, {error: err});
        }
    }

}

module.exports = AuthController;
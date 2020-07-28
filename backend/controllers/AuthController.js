const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require('../services/UserService');
const saltRounds = 10;

class AuthController {

    static async register(ctx) {
        try {
            const hash = await bcrypt.hash(ctx.request.body.password, saltRounds);
            const userInstance = new User({
                username: ctx.request.body.username,
                password: hash
            });

            const newUser = await userInstance.save();
            ctx.status = 200;
            const token = jwt.sign(
                { id: userInstance._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h"
                }
            );
            ctx.body = {username: newUser.username, currency: newUser.currency, nodes: newUser.nodes, token: token};
        } catch (err) {
            console.log(err);
            ctx.throw(422, {error: err});
        }
    }

    static async login(ctx) {
        try {
            const user = await User.findOne({username: ctx.request.body.username});
            if (!user) {
                ctx.throw(500, "Wrong Credentials");
            } else {
                const comparison = await bcrypt.compare(ctx.request.body.password, user.password);

                if (comparison) {
                    const token = jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "24h"
                        }
                    );

                    const profits = await UserService.collectOfflineProfits(user);

                    ctx.status = 200;
                    ctx.body = {username: user.username, currency: user.currency, nodes: user.nodes, offline_profits: profits, token: token};
                } else {
                    return ctx.throw(403, "Error: Auth failed");
                }
            }
        } catch (err) {
            console.log(err);
            ctx.throw(422, {error: err});
        }
    }

}

module.exports = AuthController;
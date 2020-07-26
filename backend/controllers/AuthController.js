const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const jwt = require("jsonwebtoken"); // might want to use this later to add Remember Me

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
            ctx.body = newUser;
        } catch (err) {
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
                    ctx.status = 200;
                    ctx.body = {username: user.username};
                } else {
                    return ctx.throw(403, "Error: Auth failed");
                }
            }
        } catch (err) {
            ctx.throw(422, {error: err});
        }
    }

}

module.exports = AuthController;
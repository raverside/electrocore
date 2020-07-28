const jwt = require("jsonwebtoken");

const checkToken = async (ctx, next) => {
    const token = ctx.get('x-access-token') || ctx.get('authorization');
    if(token) {
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            ctx.decode = decode;
            await next();
        } catch (err){
            console.log(err);
            ctx.throw(403, "Error: token is not valid");
        }
    } else {
        ctx.throw(403, "Error: token is not valid");
    }
};

module.exports = checkToken;
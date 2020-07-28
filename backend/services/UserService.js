const User = require('../models/User');

class UserService {

    static async getUserById() {
        const User = await User.findOne({ _id: ctx.decode.id });

        return User;
    }

    static async collectOfflineProfits(User) {
        let profits = 0;

        User.nodes.forEach(function(node){
            const now = new Date().getTime();
            const running_until = new Date(node.running_until).getTime();
            if (node.auto && now > running_until) {
                const missedExecutions = Math.round(((now - running_until) / 1000) / node.seconds);
                profits += node.profit * missedExecutions;
            }
        });

        await this.changeCurrency(profits, User);

        return profits;
    }

    static async changeCurrency(amount, User) {
        try {
            await User.updateOne({currency: Math.max(User.currency + amount, 0)});
        } catch(err) {
            console.log(err);
        }
    }

}

module.exports = UserService;
const UserModel = require('../models/User');

class UserService {

    /**
     * Retrieve the User by id
     *
     * @param id
     * @returns {Promise<Object>}
     */
    static async getUserById(id) {
        return await UserModel.findOne({ _id: id });
    }

    /**
     * Retrieve the User by username
     *
     * @param username
     * @returns {Promise<Object>}
     */
    static async getUserByName(username) {
        return await UserModel.findOne({ username: username });
    }

    /**
     * Create a new User from username and password hash
     *
     * @param username
     * @param hash
     * @returns {Promise<Object>}
     */
    static async register(username, hash) {
        const userInstance = new UserModel({
            username: username,
            password: hash
        });

        return await userInstance.save();
    }


    /**
     * Catch the User up on missed currency
     *
     * @param User
     * @returns {Promise<Number>}
     */
    static async collectOfflineProfits(User) {
        let profits = 0;

        if (typeof User.nodes !== 'undefined' && User.nodes.length > 0) {
            User.nodes.forEach(function (node) {
                const now = new Date().getTime();
                const running_until = new Date(node.running_until).getTime(); // when this node stopped execution

                if (node.auto && now > running_until) {
                    const missedExecutions = Math.round(((now - running_until) / 1000) / node.seconds); // how many times this node could've been executed while user was offline
                    profits += node.profit * missedExecutions;
                }
            });
        }

        await this.changeCurrency(profits, User);

        return profits;
    }

    /**
     * Add/subtract currency to/from User
     * Usage:
     * Add: changeCurrency(amount, user)
     * Subtract: changeCurrency(-amount, user)
     *
     * @param amount
     * @param User
     * @returns {Promise<Object>}
     */
    static async changeCurrency(amount, User) {
        return await User.updateOne({currency: Math.max(User.currency + amount, 0)}); // Math.max here keeps the amount positive
    }

}

module.exports = UserService;
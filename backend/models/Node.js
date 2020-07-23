class Node {

    constructor(name, upgrade_cost, profit){
        this.name = name;
        this.upgrade_cost = upgrade_cost;
        this.profit = profit;
        this.level = 0;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setUpgradeCost(upgrade_cost) {
        this.upgrade_cost = upgrade_cost;
    }

    getUpgradeCost() {
        return this.upgrade_cost;
    }

    setProfit(profit) {
        this.profit = profit;
    }

    getProfit() {
        return this.profit;
    }

    setLevel(level) {
        this.level = level;
    }

    getLevel() {
        return this.level;
    }

}

module.exports = Node;
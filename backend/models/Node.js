class Node {

    constructor(name, initial_cost, upgrade_cost, profit){
        this.name = name;
        this.initial_cost = initial_cost;
        this.upgrade_cost = upgrade_cost;
        this.profit = profit;
        this.level = 0;
        this.auto = false;
        this.bought = false;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setInitialCost(initial_cost) {
        this.initial_cost = initial_cost;
    }

    getInitialCost() {
        return this.initial_cost;
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

    setAuto(auto) {
        this.auto = auto;
    }

    getAuto() {
        return this.auto;
    }

    setBought(bought) {
        this.bought = bought;
    }

    getBought() {
        return this.bought;
    }

}

module.exports = Node;
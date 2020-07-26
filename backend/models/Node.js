class Node {

    constructor(id, name, initial_cost, upgrade_cost, maxLevel, auto_cost, profit, seconds){
        this.id = id;
        this.name = name;
        this.initial_cost = initial_cost;
        this.upgrade_cost = upgrade_cost;
        this.auto_cost = auto_cost;
        this.profit = profit;
        this.seconds = seconds;
        this.level = 0;
        this.maxLevel = maxLevel;
        this.auto = false;
        this.bought = false;
    }

    getId() {
        return this.id;
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

    setAutoCost(auto_cost) {
        this.auto_cost = auto_cost;
    }

    getAutoCost() {
        return this.auto_cost;
    }

    setProfit(profit) {
        this.profit = profit;
    }

    getProfit() {
        return this.profit;
    }

    setSeconds(seconds) {
        this.seconds = seconds;
    }

    getSeconds() {
        return this.seconds;
    }

    setLevel(level) {
        this.level = level;
    }

    getLevel() {
        return this.level;
    }

    setMaxLevel(maxLevel) {
        this.maxLevel = maxLevel;
    }

    getMaxLevel() {
        return this.maxLevel;
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
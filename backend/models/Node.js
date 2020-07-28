const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Child Schema for User
 * @type {*|Mongoose.Schema}
 */
const NodeSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        min: 1
    },
    initial_cost: {
        type: Number,
        required: true,
        min: 1
    },
    upgrade_cost: {
        type: Number,
        required: true,
        min: 1
    },
    auto_cost: {
        type: Number,
        required: true,
        min: 1
    },
    profit: {
        type: Number,
        required: true,
        min: 1
    },
    seconds: {
        type: Number,
        required: true,
        min: 1
    },
    level: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    maxLevel: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    auto: {
        type: Boolean,
        default: false
    },
    bought: {
        type: Boolean,
        default: false
    },
    running_start: {
        type: Number,
        required: false
    },
    running_until: {
        type: Number,
        required: false
    }
});

module.exports = NodeSchema;
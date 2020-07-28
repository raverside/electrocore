const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: 1
    },
    password: {
        type: String,
        required: true,
        min: 1
    },
    currency: {
        type: Number,
        min: 0,
        default: 50
    },
    nodes: {
        type : Array,
        default : []
    },
    offline_profits: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', UserSchema);
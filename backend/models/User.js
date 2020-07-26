const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    currency: {
        type: Number,
        min: 0,
        default: 50
    }
});

module.exports = mongoose.model('User', UserSchema);
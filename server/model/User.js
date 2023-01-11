const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        User: {
            type: Number,
            default: 1003
        },
        Editor: Number,
        Admin: Number,
    },
    refreshToken: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('User', userSchema)
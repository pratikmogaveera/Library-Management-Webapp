const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    bookType: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    tags: [{
        type: String
    }],
    isIssued: {
        type: Boolean,
        required: true,
    },
})

module.exports = mongoose.model('Book', bookSchema)
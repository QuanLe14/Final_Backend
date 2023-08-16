const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String }
});

const Book = mongoose.model('300365849-Quan', bookSchema);

module.exports = Book;
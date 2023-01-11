const crypto = require('crypto')
const Book = require('../model/Book')

const getAllBooks = async (req, res) => {
    // Get all books in database.
    const result = await Book.find() 
    res.json(result)
}

const addBook = async (req, res) => {
    // Check for all required data in request.
    if (!req.body.title || !req.body.author || !req.body.bookType || !req.body.publishedYear || !req.body.tags)
        return res.status(400).json({ "message": "Missing some details about the book." })

    const { title, author, bookType, publishedYear, tags, isIssued } = req.body

    try {
        // Create a new book in database.
        const result = await Book.create({
            id: crypto.randomUUID().replace('-', ''),
            title,
            author,
            bookType,
            publishedYear,
            tags,
            isIssued
        })
        res.status(201).json(result)
    } catch (err) {
        console.error(err.message)
    }
}

const updateBook = async (req, res) => {
    // Check for id of book to update.
    if (!req.params.id)
        return res.status(400).json({ "message": "Required 'id' of the book to update." })

    // Find the book with given id in database.
    const foundBook = await Book.findOne({ id: req.params.id }).exec()

    // If book with given id doesnt exist in database.
    if (!foundBook)
        return res.status(404).json({ "message": `No book found with 'id' of ${id}` })

    // Check for updated data provided in request and apply the changes.
    if (req.body?.title) foundBook.title = req.body.title
    if (req.body?.author) foundBook.author = req.body.author
    if (req.body?.bookType) foundBook.bookType = req.body.bookType
    if (req.body?.publishedYear) foundBook.publishedYear = req.body.publishedYear
    if (req.body?.tags) foundBook.tags = req.body.tags
    if (req.body?.isIssued) foundBook.isIssued = req.body.isIssued

    const result = await foundBook.save()
    res.status(204).json(result)
}

const removeBook = async (req, res) => {
    // Check for id of book to delete.
    if (!req.params.id)
        return res.status(400).json({ "message": "Required 'id' of the book to delete." })

    const id = req.params.id
    // Find the book with given id in database.
    const foundBook = await Book.findOne({ id }).exec()

    // If book with given id doesnt exist in database.
    if (!foundBook)
        return res.status(204).json({ message: `No employee found with id: ${id}.` })

    const result = await Book.deleteOne({ id })
    res.status(204).json(result)
}

const getBook = async (req, res) => {
    // Check for id of book to delete.
    if (!req.params.id)
        return res.status(400).json({ "message": "Required a number 'id' of the book to search." })

    const id = req.params.id
    // Find the book with given id in database.
    const foundBook = await Book.findOne({ id }).exec()

    // If book with given id doesnt exist in database.
    if (!foundBook)
        return res.status(404).json({ "message": `No book found with 'id' of ${id}` })

    res.status(200).json(foundBook)
}

const getIssuedBooks = async (req, res) => {
    // Find all books which are issued.
    const foundBooks = await Book.find({ isIssued: true }).exec()
    if (!foundBooks)
        return res.status(200).json([])
    res.status(200).json(foundBooks)
}

const getAvailableBooks = async (req, res) => {
    // Find all books which are available / not issued
    const foundBooks = await Book.find({ isIssued: false }).exec()
    if (!foundBooks)
        return res.status(200).json([])
    res.status(200).json(foundBooks)
}

module.exports = { getAllBooks, addBook, updateBook, removeBook, getBook, getIssuedBooks, getAvailableBooks }
require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { urlencoded } = require('body-parser')
const { errorHandler } = require('./middleware/errorHandler')
const connectDB = require('./config/dbConn')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001

// Connect to MongoDB
connectDB()

const app = express()
const { eventLogger } = require('./middleware/logEvents')

// Logs events
app.use(eventLogger)

app.use(credentials)

// app.use(cors())
app.use(cors(corsOptions))

// middleware: content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// middleware: for json
app.use(express.json())

app.use(cookieParser())

app.use('/users', require('./routes/users'))
app.use('/books', require('./routes/books'))

app.get('*', (req, res) => {
    res.status(404)
    res.json({ error: '404 Not Found.' })
})

// Error Logger
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB')
    app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
})
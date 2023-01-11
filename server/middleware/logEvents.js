const { format } = require('date-fns')
const path = require('path')
const fsp = require('fs').promises
const fs = require('fs')
const { v4: uuid } = require('uuid')

const logEvents = async (message, fileName) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\thh:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            fsp.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsp.appendFile(path.join(__dirname, '..', 'logs', fileName), `${logItem}`)

    } catch (err) {
        console.error(err.message)
    }
}

const eventLogger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requests_log.txt')
    next()
}


module.exports = { logEvents, eventLogger }
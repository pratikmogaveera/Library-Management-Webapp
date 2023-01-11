const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/User')

const getAllUsers = async (req, res) => {
    // Get all users in database.
    res.status(200).json(data)
}

const registerUser = async (req, res) => {
    // Check if all required details are provided
    if (!fullname, !username || !password)
        return res.status(400).json({ message: "Please enter username and password." })

    const { fullname, username, password } = req.body
    const roles = req.body?.roles

    // Check if an user with given username already exists.
    const duplicate = await User.findOne({ username }).exec()
    if (duplicate) return res.status(409).json({ message: "Username already taken." })
    try {
        // encrypt password
        const hashedPwd = await bcrypt.hash(password, 10)

        // Create and store new user.
        const result = await User.create({
            fullname: fullname,
            username: username,
            password: hashedPwd,
            roles: roles
        })

        res.status(201).json({ success: `New user '${username}' has been registered.` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const loginUser = async (req, res) => {
    // Check if username and password is provided.
    if (!req.body.username || !req.body.password)
        return res.status(400).json({ "message": "Please provide username and password" })

    const { username, password } = req.body
    const foundUser = await User.findOne({ username }).exec()

    // If a user with given username does not exist.
    if (!foundUser) return res.status(401).json({ message: `User ${username} does not exist.` })

    // Verify creadentials
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        const roles = Object.values(foundUser.roles)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        )

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // Saving user's refresh token in database
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

        res.json({
            accessToken,
            roles: roles,
            isAdmin: foundUser.roles['Admin'] === 1001,
            isEditor: foundUser.roles['Editor'] === 1002
        })
    }
    else {
        res.status(401).json({ 'failure': `Fail!, Please check your credentials.` })
    }

}

const logoutUser = async (req, res) => {
    const cookies = req.cookies
    
    // Check for jwt cookie
    if (!cookies?.jwt) 
        return res.sendStatus(204)

    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({ refreshToken }).exec()

    // If the user does not exist / refreshToken is invalid.
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }

    // Reset the users refreshToken in database.
    foundUser.refreshToken = ""
    const result = await foundUser.save()

    // Clear cookie from user's device's memory
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    
    // Check for jwt cookie
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    // If the user does not exist / refreshToken is invalid.
    const foundUser = await User.findOne({ refreshToken }).exec()
    if (!foundUser) return res.sendStatus(403)

    // Verify the user's refreshToken with our Private Refresh Token
    jwt.verify(
        foundUser.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            // If any error occues
            if (err || foundUser.username !== decoded.username) 
                return res.status(403)
            
            // Else Provide the user with new Access Token.
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '20s' }
            )
            res.cookie('jwt', foundUser.refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({
                accessToken,
                roles: roles,
                isAdmin: foundUser.roles['Admin'] === 1001,
                isEditor: foundUser.roles['Editor'] === 1002
            })
        }
    )
}


module.exports = { getAllUsers, registerUser, loginUser, logoutUser, handleRefreshToken }
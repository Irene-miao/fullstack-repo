const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Create new user
usersRouter.post('/', async (request, response) => {
    const body = request.body
console.log(body)
if (!body.password) {
    return response.status(400).json({ error: "Missing password" })
} else if (body.password.length < 3) {
    return response.status(400).json({ error: "Password must be at least 3 characters long" })
}
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
 
 
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

// Get all users
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter
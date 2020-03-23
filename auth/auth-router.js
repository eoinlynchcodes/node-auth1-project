// import bcryptjs, routes and express-router

// End points go here for:
// /register, /login, /logout

const bc = require('bcryptjs')
const router = require('express').Router()
const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
    console.log('This is the register endpoint...')
    const { username, password } = req.body

    const hashedPassword = bc.hashSync(password, 10)

    Users.add({
        username, 
        password: hashedPassword
    })
    .then(data => {
        console.log(data)
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'You shall not pass!'})
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    Users.findBy({ username }).first()
    .then(user => {
        if(user && bc.compareSync(password, user.password))
        req.session.user = user

        res.json({ message: `Logged In...`})
    })
})
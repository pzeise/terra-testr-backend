const express = require('express')
const router = express.Router()

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const User = require('../models/user-model')

router.post('/login', async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    })

    const payload = ticket.getPayload()

    let user = await User.findOne({ googleId: payload?.sub })
        .populate('completed')
    if (!user) {
        user = await new User({
            name: payload?.name,
            avatar: payload?.picture,
            completed: [],
            googleId: payload?.sub
        })

        await user.save()
    }

    res.json({ user, token })
})

router.get('/me', async (req, res) => {
    const { token } = req.headers
    console.log(token)
    if (token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            })

            const payload = ticket.getPayload()

            let user = await User.findOne({ googleId: payload?.sub })
                .populate('completed')
            res.json({ authenticated: true, user })
        } catch (err) {
            console.log(err)
        }
    }
})

router.get('/user/logout', (req, res) => {
    clearUserTokenAndDeauthenticate(res)
})

module.exports = router
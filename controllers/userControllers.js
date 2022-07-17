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
            userName: payload?.name,
            avatar: payload?.picture,
            completed: [],
            googleId: payload?.sub
        })

        await user.save()
    }

    res.json({ user, token })
})

router.put('/:userId/:answerId/:hints', async (req, res) => {
    console.log('hit the win route')
    await User.findByIdAndUpdate(req.params.userId, {
        $push: {
            completed: {
                id: req.params.answerId, 
                hints: req.params.hints
            }
        }
    })
    .then( async (element) => {
        console.log(element)
        return await User.findById(element._id)
    })
    .then(user => {
        console.log(user)
        res.json(user)
    })
    .catch(console.error)
})



router.get('/me', async (req, res) => {
    const { token } = req.headers

    if (token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            })

            const payload = ticket.getPayload()

            let user = await User.findOne({ googleId: payload?.sub })
                // .populate('completed')
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
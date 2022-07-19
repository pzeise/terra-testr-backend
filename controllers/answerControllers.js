const express = require('express')
const router = express.Router()
const axios = require('axios')

const Answer = require('../models/answer-model')
const User = require('../models/user-model')



router.get('/:id', (req, res) => {
    Answer.findOne({_id: req.params.id})
    .then(answer => {
        res.json(answer)
    })
    .catch(console.error)
})

router.get('/forUser/:userId', (req, res) => {
    let answers = {}
    Answer.find({})
    .then(async (element) => {
        answers = element
        return await User.findById(req.params.userId)
    })
    .then(user => {
        user.completed.forEach(puzzle => {
            let x = answers.findIndex(el => el._id.toString() === puzzle.id.toString())
            answers[x].show = true
            answers[x].hints = parseInt(puzzle.hints)
            console.log(answers[x])
        })
        return answers
    })
    .then(element => res.json(element))
    .catch(console.error)        
})

router.post('/', (req, res) => {
    let ans = req.body
    Answer.create({
        endState: {
            title: ans.title,
            image: ans.image,
            lat: parseFloat(ans.Lat3),
            lng: parseFloat(ans.Lng3)
        },
        locations: 
            [{
                lat: parseFloat(ans.Lat1),
                lng: parseFloat(ans.Lng1)
            },
            {
                lat: parseFloat(ans.Lat2),
                lng: parseFloat(ans.Lng2)
            },
            {
                lat: parseFloat(ans.Lat3),
                lng: parseFloat(ans.Lng3)
            }]
    })
    .then(answer => {
        answer.owner.push(ans.user)
        answer.save()
        res.json(answer)
    })
    .catch(console.error)
})

module.exports = router
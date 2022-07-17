const express = require('express')
const router = express.Router()
const axios = require('axios')

const Answer = require('../models/answer-model')



router.get('/:id', (req, res) => {
    console.log('hit id route')
    Answer.findOne({_id: req.params.id})
    .then(answer => {
        res.json(answer)
    })
    .catch(console.error)
})

router.get('/', (req, res) => {
    Answer.find({})
    .then(answers => {
        res.json(answers)
    })
    .catch(console.error)
})

router.post('/', (req, res) => {
    console.log(req.body)
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
        res.json(answer)
    })
    .catch(console.error)
})

module.exports = router
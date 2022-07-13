const express = require('express')
const router = express.Router()
const axios = require('axios')

const Answer = require('../models/answer-model')


router.get('/', (req, res) => {
    Answer.findOne({})
    .then(answer => {
        res.json(answer)
    })
    .catch(console.error)
})

router.get('/:id', (req, res) => {
    console.log('hit the not route')
    Answer.findOne({_id: {$ne: req.params.id}})
    .then(answer => {
        res.json(answer)
    })
    .catch(console.error)
})

module.exports = router
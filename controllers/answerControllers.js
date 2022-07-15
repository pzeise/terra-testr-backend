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
    console.log('hit base route')
    Answer.find({})
    .then(answers => {
        res.json(answers)
    })
    .catch(console.error)
})

module.exports = router
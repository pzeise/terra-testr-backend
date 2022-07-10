const express = require('express')
const router = express.Router()
const axios = require('axios')

const Answer = require('../models/answer-model')


router.get('/', (req, res) => {
    Answer.find({})
    .then(answer => {
        res.json(answer)
    })
    .catch(console.error)
})

router.get('/:id', (req, res) => {
    Answer.findById(req.params.id)
    .then(answer => {
        res.json(answer)
    })
    .catch(console.error)
})

module.exports = router
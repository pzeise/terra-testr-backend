const Answer = require('../models/answer-model')
const answerSeeds = require('./answer-seeds.json')


Answer.deleteMany({})
    .then(() => Answer.create(answerSeeds))
    .then(elements => console.log(`Entered ${elements.length} Answers`))
    .catch(console.error)
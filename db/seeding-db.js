const Answer = require('../models/answer-model')
const User = require('../models/user-model')
const answerSeeds = require('./answer-seeds.json')
const userSeeds = require('./user-seeds.json')


Answer.deleteMany({})
    .then(() => Answer.create(answerSeeds))
    .then(elements => console.log(`Entered ${elements.length} Answers`))
    .catch(console.error)

User.deleteMany({})
    .then(() => User.create(userSeeds))
    .then(elements => console.log(`Entered ${elements.length} Users`))
    .catch(console.error)
const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const AnswerSchema = new mongoose.Schema(
    {
        locations: 
            [{
                lat: {type: Number},
                lng: {type: Number}
            }],
        endState: {
            title: String,
            image: String,
            lat: Number, 
            lng: Number
        },
        show: {type: Boolean, default: false},
        hints: Number,
        owner: {type: [{type: ObjectId, ref: 'User'}], default: ["62ce0e30a0bfee6329c2e27c"]}
    }
)

const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer
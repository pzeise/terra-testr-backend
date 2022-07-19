const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const AnswerSchema = new mongoose.Schema(
    {
        // _id: {
        //     type: String, 
        //     required: true
        // },
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
        show: {type: Boolean, default: true},
        hints: Number
    }
)

const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer
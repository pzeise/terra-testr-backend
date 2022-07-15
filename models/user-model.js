const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String, 
            required: true,
            trim: true,
            index: { collation: {locale: 'en', strength:2 }}
        },
        avatar : String,
        completed: [{
            hints: Number,
            id: {type: ObjectId, ref: 'Answer'}
        }],
        googleId: { 
            type: String,
            unique: true
        }
    },
    {timestamps: true}
)

const User = mongoose.model('User', UserSchema)
module.exports = User
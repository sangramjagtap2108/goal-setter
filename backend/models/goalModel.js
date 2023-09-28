const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user: {
        // ObjectId - _id
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref : Model
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Goal',goalSchema);
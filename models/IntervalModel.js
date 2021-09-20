const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const IntervalSchema = Schema({
    
    topic: {
        type: Schema.Types.String
    },
    comment: {
        type: Schema.Types.String,
    },
    start: {
        type: Schema.Types.Date,
        required: true
    },
    end: {
        type: Schema.Types.Date,
        required: false
    },
    isFinished: {
        type: Schema.Types.Boolean,
        default: false,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
})

module.exports = model("Interval", IntervalSchema)
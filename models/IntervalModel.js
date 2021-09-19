const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const IntervalSchema = Schema({
    start: {
        type: Schema.Types.Date,
        required: true
    },
    end: {
        type: Schema.Types.Date,
        required: true
    },
    comment: {
        type: Schema.Types.String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = model("Interval", IntervalSchema)
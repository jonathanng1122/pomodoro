const mongoose = require('mongoose');
const {colorValidator} = require('../utilities/color');

const {Schema, model} = mongoose;

const TopicSchema = Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    color: {
        type: Schema.Types.String,
        validator: [colorValidator, 'Invalid color'],
        required: true,
        default: "#5596e0"
    }
})

const TimeSettingsSchema = Schema({
    topics: [TopicSchema]
})

module.exports = model("TimeSettings", TimeSettingsSchema)
const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {Date, String, Number} = Schema.Types;

const IntervalSchema = Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    comment: {
        type: String
    }
})

const DaySchema = Schema({
    total: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: false //maybe you start a tomato, close the browser and then end timer
    },
    intervals: [IntervalSchema]
})

const PomodoroSchema = Schema({
    total: {
        type: Number
    },
    startOfDay: {
        type: Number, //
        required: true,
        min: 0,
        max: 24
    },
    timezoneOffset: {//getTimezoneOffset
        type: Number,
        required: true,
        min: -11,
        max: 12
    },
    currentDay: DaySchema,
    days: [DaySchema]
})

const Pomodoro = model("Pomodoro", PomodoroSchema)

module.exports = Pomodoro;
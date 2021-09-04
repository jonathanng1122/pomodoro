const Pomodoro = require('../models/Pomodoro');
const User = require('../models/User');
const {disableAuth} = require('../config');
const {generateError} = require('./ErrorController');
const {nextDay, calculateStart} = require('../utilities/time');
const {getUser} = require('./UserController');
/**
 * Assumption: You have user model data stored somewhere in the state
 */
module.exports = {
    getPomodoroById: async (pomodoroId) => {
        return await Pomodoro.findById(pomodoroId, async (err, pomodoro) => {
            if (err) {
                return generateError(err);
            } else if (disableAuth) {
                return pomodoro
            }
        })
    },
    //note that day and the last day in days are the same, this link must be maintained
    createPomodoro: async (userId, startOfDay, timezoneOffset) => {
        if (!userId && !startOfDay && !timezoneOffset) {
            generateError('need userId, startOfDay and timezoneOffset')
        }
        const start = calculateStart(startOfDay, timezoneOffset);
        const day = {
            start,
            end: nextDay(start),
            intervals: []
        }
        const pomodoro = await Pomodoro.create({
            days:[day],
            currentDay: day,
            startOfDay,
            timezoneOffset
        })
        if (pomodoro._id == null) {
            throw new Error('pomodoro does not have an id');
        }
        const user = await getUser(userId);
        user.timer = pomodoro._id;
        await user.save();
    },
    deletePomodoro: async (pomodoroId) => {},
    setTimezoneOffset: async () => {

    },
    setStartofDay: async () => {

    }
}



const Interval = require('../models/IntervalModel');
const { getNextDate } = require('../utilities/time');

module.exports = {
    getAllIntervals: async () => {
        return await Interval.find({});
    },
    getInterval: async (intervalId) => {
        return await Interval.findById(intervalId);
    },
    /**
     * 
     * @param {Date} date 
     * @returns intervals between date and 24 hours after
     */
    getIntervalsOn: async (date) => {
        const nextDate = getNextDate(date);
        return await Interval.find({
            start: { //this can also be approached by finding the end fields
                $gte: date,
                $lt: nextDate
            }
        });
    },
    addInterval: async (interval) => {
        const newInterval = new Interval();
        Object.keys(interval).forEach(key => {
            if (key === 'topic' || key === 'comment' || key === 'start' || key === 'end' || key === 'isFinished' || key === 'userId') {
                newInterval[key] = interval[key];
            }
        })
        return await newInterval.save();
    },
    /**
     * takes an interval with a interval.id value and updates the other values
     * @param {Interval} interval 
     * @returns the updated interval
     */
    updateInterval: async (intervalId, interval) => {
        if (interval && intervalId) {
            const filter = {id: interval.id}
            const update = {...interval}
            return await Interval.findOneAndUpdate(filter, update);
        } else {
            throw Error('cant update interval')
        }
    },
    deleteInterval: async (intervalId) => {
        return await Interval.deleteOne({id: intervalId});
    }


}
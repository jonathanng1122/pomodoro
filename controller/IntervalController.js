const Interval = require('../models/IntervalModel');
const { getNextDate } = require('../utilities/time');


// some code for field verification
// Object.keys(interval).forEach(key => {
        //     if (key === 'topic' || key === 'comment' || key === 'start' || key === 'end' || key === 'isFinished' || key === 'userId') {
        //         newInterval[key] = interval[key];
        //     }
        // })

async function setDependentFieldsAndSave(interval) {
    interval.isFinished = interval.start && interval.end && true || false;
    return await interval.save();
}

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
     * @returns intervals on date and 24 hours after
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
        const newInterval = new Interval({...interval});
        return await setDependentFieldsAndSave(newInterval);
        
        
    },
    /**
     * takes an interval with a interval.id value and updates the other values
     * @param {Interval} interval 
     * @returns the updated interval
     */
    updateInterval: async (intervalId, interval) => {
        if (interval && intervalId) {
            const filter = {id: interval.id}
            if (interval._id) {
                delete interval._id
            }
            const update = {...interval}
            const options = {new: true, multi: true}
            const updatedInterval = await Interval.findOneAndUpdate(filter, update, options);
            return await setDependentFieldsAndSave(updatedInterval);
        } else {
            throw Error('cant update interval')
        }
    },
    deleteInterval: async (intervalId) => {
        return await Interval.deleteOne({id: intervalId});
    }


}
const express = require('express');
const router = express.Router();
const {
    getInterval,
    getIntervalsOn,
    addInterval,
    updateInterval,
    deleteInterval,
    getAllIntervals
} = require('../controller/IntervalController');
const {getPreviousDate, getStartOfDay} = require('../utilities/time')

/**
 * converts mongo interval date string into date number
 * @param {*} interval 
 */
const intervalAdapter = (interval) => {
    console.log(interval)
    const newInterval = interval.toObject();
    if (interval.start) {
        newInterval.start = new Date(interval.start).getTime()
    }
    if (interval.end) {
        newInterval.end = new Date(interval.end).getTime()
    }
    return newInterval
}

/**
 * converts an array of mongo interval date strings into date numbers
 * @param {*} intervals 
 */
const intervalsAdapter = (intervals) => {
    const newIntervals = [];
    for (let i = 0; i < intervals.length; i++) {
        newIntervals.push(intervalAdapter(intervals[i]))
    }
    return newIntervals
}

/**
 * Gets all intervals
 */
router.get('/', async (req, res) => {
    const intervals = await getAllIntervals();
    
    return res.json({interval: intervalsAdapter(intervals)})
})

// //gets array of intervals in the last 24 hours
// router.get('/today/:timezoneOffset/:year/:month/:date', async (req, res) => {
//     //gets the of today which if it's 9/12/2021 xx:xx time
//     //begin = 9/12/2021 12:00 AM + any startOfDayOffset (in config.js)
//     const date = new Date();
//     const begin = getStartOfDay(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getTimezoneOffset(), 0);
//     //interval will be all of the intervals after
//     //between "9/12/2021 12:00 AM + any startOfDayOffset" and
//     //        "9/13/2021 12:00 AM + any startOfDayOffset"
//     const interval = await getIntervalsOn(begin);
//     return res.json({interval})
// })
router.get('/recent24hours', async (req, res) => {
    const intervals = await getIntervalsOn(getPreviousDate(new Date()));
    return res.json({interval: intervalAdapter(intervals)})
})
// gets array of intervals 24 hours after time
router.get('/day/:time', async (req, res) => {
    const time = parseInt(req.params.time)
    const intervals = await getIntervalsOn(time);
    return res.json({interval: intervalsAdapter(intervals)})
})

router.get('/:id', async (req, res) => {
    const interval = await getInterval(req.params.id);
    return res.json({interval: intervalAdapter(interval)})
})

//posts a new resource
router.post('/new', async (req, res) => {
    const interval = await addInterval(req.body)
    return res.json({
        interval: intervalAdapter(interval)
    });
})

//updates an existing resource
//params.id is interval id
// req.body is interval values that you want to update
router.post('/:id', async (req, res) => {
    const interval =  await updateInterval(req.params.id, req.body)
    return res.json({
        interval: intervalAdapter(interval)
    });
})



module.exports = router;
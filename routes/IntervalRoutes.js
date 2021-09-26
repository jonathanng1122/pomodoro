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
 * Gets all intervals
 */
router.get('/', async (req, res) => {
    const interval = await getAllIntervals();
    return res.json({interval})
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
    const interval = await getIntervalsOn(getPreviousDate(new Date()));
    return res.json({interval})
})
// gets array of intervals 24 hours after time
router.get('/day/:time', async (req, res) => {
    const time = parseInt(req.params.time)
    const interval = await getIntervalsOn(time);
    return res.json({interval})
})

router.get('/:id', async (req, res) => {
    const interval = await getInterval(req.params.id);
    return res.json({interval})
})

//posts a new resource
router.post('/new', async (req, res) => {
    return res.json({interval: await addInterval(req.body)});
})

//updates an existing resource
//params.id is interval id
// req.body is interval values that you want to update
router.post('/:id', async (req, res) => {
    return res.json({interval: await updateInterval(req.params.id, req.body)});
})



module.exports = router;
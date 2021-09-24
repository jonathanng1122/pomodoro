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
const {getPreviousDate} = require('../utilities/time')
/**
 * Gets all intervals
 */
router.get('/', async (req, res) => {
    const interval = await getAllIntervals();
    return res.json({interval})
})

//gets array of intervals in the last 24 hours
router.get('/today', async (req, res) => {
    const interval = await getIntervalsOn(getPreviousDate(time));
    return res.json({interval})
})
// gets array of intervals 24 hours after time
router.get('/day/:time', async (req, res) => {
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
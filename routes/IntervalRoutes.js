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

/**
 * Gets all intervals
 */
router.get('/', async (req, res) => {
    const interval = await getAllIntervals();
    return res.json({interval})
})

router.get('/:id', async (req, res) => {
    const interval = await getInterval(req.params.id);
    return res.json({interval})
})

router.post('/', async (req, res) => {
    // const {start, end, isFinished, userId} = req.body;
    console.log(req.body);
    return res.json({interval:await addInterval(req.body)});
})



module.exports = router;
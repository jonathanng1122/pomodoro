const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pomodoro = require('../models/Pomodoro')
router.get('/', async (req, res) => {
    const users = await User.find({});
    return res.json({users})
})


module.exports = router;
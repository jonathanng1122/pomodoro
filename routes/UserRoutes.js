const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.get('/', async (req, res) => {
    const users = await User.find({});
    return res.json({users})
})


module.exports = router;
const User = require('../models/User')

module.exports = {
    getUser: async (userId) => {
        return await User.findById(userId, (err, user) => {
            return user;
        })
    },
}
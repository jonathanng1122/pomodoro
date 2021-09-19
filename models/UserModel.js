const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    timer: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
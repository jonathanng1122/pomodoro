const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000 || process.env.PORT;
const {MONGODB_URI} = require('./config.js')

app.use('/api/users', require("./routes/UserRoutes.js"))
app.use('/api/intervals', require("./routes/IntervalRoutes.js"))

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //uses server selection whatever that means... does algorthims
})
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
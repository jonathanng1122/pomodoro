const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000 || process.env.PORT;

const {MONGODB_URI, CLIENT_URI} = require('./config.js')

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*" || CLIENT_URI);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/users', require("./routes/UserRoutes.js"))
app.use('/api/intervals', require("./routes/IntervalRoutes.js"))


//mongo set up
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //uses server selection whatever that means... does algorthims
})

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.once('open', () => {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })
    require('./events')(db); //pusher publisher code here
})


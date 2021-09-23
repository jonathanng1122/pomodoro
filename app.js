const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000 || process.env.PORT;

const {MONGODB_URI, pusherCredentials} = require('./config.js')

const Pusher = require("pusher");

const pusher = new Pusher(pusherCredentials);


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     next();
//   });

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies

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
    
    const channel = 'intervals';
    const intervalCollection = db.collection(channel);
    const changeStream = intervalCollection.watch();
    
    changeStream.on('change', (change) => {
        console.log(change.operationType);
        if (change.operationType === 'insert') {
            const interval = change.fullDocument;
            pusher.trigger(channel, 'inserted', interval)
        }
    });
})


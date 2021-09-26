const Pusher = require("pusher");

const {pusherCredentials} = require('../config.js');
const { intervalAdapter } = require("../utilities/time.js");

module.exports = db => {
    const pusher = new Pusher(pusherCredentials);

    const channel = 'intervals';
    const intervalCollection = db.collection(channel);
    const changeStream = intervalCollection.watch();
    //TODO: convert mongo interval into frontend interval (date string to num)
    changeStream.on('change', (change) => {
        console.log(change.operationType);
        if (change.operationType === 'insert') {
            const interval = change.fullDocument;
            interval.start = new Date(interval.start).getTime()
            if (interval.end) {
                interval.end = new Date(interval.end).getTime()
            }
            pusher.trigger(channel, 'inserted', interval);
        }
    });
}


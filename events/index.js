const Pusher = require("pusher");

const {pusherCredentials} = require('../config.js');

module.exports = db => {
    const pusher = new Pusher(pusherCredentials);

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
}


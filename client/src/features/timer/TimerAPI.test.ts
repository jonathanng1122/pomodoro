import {
    getAllIntervals,
    getInterval,
    createNewInterval,
    updateInterval
} from './TimerAPI';

it('gets all intervals', async () => {
    expect.assertions(2);
    const res = await getAllIntervals();
    expect(res).toBeTruthy();
    expect(res.data).toBeTruthy();
})


it('creates a new interval and getting it', async () => {
    expect.assertions(2);
    const msec = new Date().getTime();
    const interval: Interval = {
        start: msec,
        userId: "612b111b881930941e73e029"
    }
    const res1 = await createNewInterval(interval);
    expect(res1.data.interval._id).toBeTruthy();
    if (res1.data.interval._id) {
        const res = await getInterval(res1.data.interval._id);
        console.log(res.data)
        expect(new Date(res1.data.interval.start).getTime()).toEqual(msec);
    }
})
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
    return expect(res.data).toBeTruthy();
})


it('creates a new interval and getting it', async () => {
    expect.assertions(3);
    const msec = new Date().getTime();
    const interval: Interval = {
        start: msec,
        userId: "612b111b881930941e73e029"
    }
    const res1 = await createNewInterval(interval);
    const intervalId = res1.data.interval._id
    expect(intervalId).toBeTruthy();
    if (intervalId) {
        const res = await getInterval(intervalId);
        expect(new Date(res1.data.interval.start).getTime()).toEqual(msec);
        interval.start = msec + 12345
        const updateRes = await updateInterval(intervalId, interval)
        return expect(new Date(updateRes.data.interval.start).getTime()).toEqual(interval.start)
    }
})

//TODO: create test for update interval
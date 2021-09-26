//TODO: bug total changes when refreshing
import React, { useState, useEffect } from "react";
import {
    startTimerAsync,
    endTimerAsync,
    // cancelTimer,
    selectTotal,
    getIntervalsTodayAsync,
    selectCurrentInterval,
    selectOldIntervals,
    updateTimerState,
    // selectStatus
} from './timerSlice';
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Pusher from 'pusher-js'
import { pusherKey } from "../../config";
import { checkTimerEvent } from "./utilities";

console.log('new pusher instance created, if you see this message multiple times, you are creating multiple connections... BAD')
const pusher = new Pusher(pusherKey, {
    cluster: 'us3'
});

export function Timer() {
    const total = useAppSelector(selectTotal);
    const currentInterval = useAppSelector(selectCurrentInterval);
    const oldIntervals = useAppSelector(selectOldIntervals);
    // const status = useAppSelector(selectStatus);
    const [currentLength, setCurrentLength] = useState(0);

    // const tasks = useAppSelector();
    const dispatch = useAppDispatch();
    useEffect(() => {
        // Your code here
        dispatch(getIntervalsTodayAsync())
    }, [dispatch]);



    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentInterval) {
                setCurrentLength(Date.now() - currentInterval.start)
            } else if (currentLength !== 0) {
                setCurrentLength(0)
            }

        }, 1); // updates every 1 milliseconds

        const channel = pusher.subscribe('intervals');
        channel.bind('inserted', (data: Interval) => {
            //TODO: make changes based on userId also
            console.log('detecting insert event')
            console.log({
                currentInterval,
                oldIntervals,
                data
            })
            if (!checkTimerEvent({ currentInterval: currentInterval, intervals: oldIntervals }, data)) {
                console.log('timer state being updated')
                dispatch(updateTimerState(data))
            }
        })
        return () => {
            clearInterval(intervalId);
            channel.unbind()
        }
    }, [currentInterval, oldIntervals, currentLength, dispatch]);
    return (
        <div>
            <button onClick={() => dispatch(startTimerAsync())}>Start Timer</button>
            <button onClick={() => {
                if (currentInterval) {
                    dispatch(endTimerAsync(currentInterval))
                } else {
                    throw Error('Can not end a timer that has not started')
                }
                setCurrentLength(0);
            }}>End Timer</button>
            {/* <button onClick={() => dispatch(cancelTimer())}>Cancel Timer</button> */}
            <h1>total: {total}</h1>
            {(() => {
                return <div>
                    currentLength: {currentLength}
                    <div>start: {currentInterval ? currentInterval.start : 'null'}</div>
                    <div>end: {currentInterval ? currentInterval.end : 'null'}</div>
                </div>
            })()}
            {(() => {
                return oldIntervals.map(interval => {
                    const start = new Date(interval.start);
                    if (interval.end) {
                        const end = new Date(interval.end);
                        return <div key={start.toString()}>{start.getHours()}:{start.getMinutes()} to {end.getHours()}:{end.getMinutes()} </div>
                    } else {
                        return <div key={start.toString()}></div>
                    }
                }).reverse()
            })()}
        </div>
    )
}

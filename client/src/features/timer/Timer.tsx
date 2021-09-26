import React, { useState, useEffect } from "react";
import {
    startTimerAsync,
    endTimerAsync,
    cancelTimer,
    selectTotal,
    getIntervalsTodayAsync,
    selectCurrentInterval,
    selectOldIntervals,
    selectStatus
} from './timerSlice';
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Pusher from 'pusher-js'
import { pusherKey } from "../../config";
import { getAllIntervals } from "./TimerAPI";

export function Timer() {
    const total = useAppSelector(selectTotal);
    const currentInterval = useAppSelector(selectCurrentInterval);
    const oldIntervals = useAppSelector(selectOldIntervals);
    const status = useAppSelector(selectStatus);
    //TODO: currentLength
    const [currentLength, setCurrentLength] = useState(0);

    // const tasks = useAppSelector();
    const dispatch = useAppDispatch();
    useEffect(() => {
        // Your code here
        dispatch(getIntervalsTodayAsync())
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentInterval) {
                setCurrentLength(Date.now() - currentInterval.start);
            }
        }, 1); // updates every 1 milliseconds
        // const pusher = new Pusher(pusherKey, {
        //     cluster: 'us3'
        // });
        // const channel = pusher.subscribe('intervals');
        // channel.bind('inserted', (data: any) => {
        //     console.log('client detects inserted event')
        //     console.log(data);
        //     if (currentInterval) {
        //         dispatch(endTimer())
        //     } else {
        //         dispatch(startTimerAsync())
        //     }
        // })
        return () => {
            clearInterval(intervalId);
            // channel.unbind('inserted')
        }
    }, [currentInterval, dispatch]);
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
            <button onClick={() => dispatch(cancelTimer())}>Cancel Timer</button>
            <button onClick={() => {
                getAllIntervals().then(res => {
                    console.log(res.data)
                })
            }}>Get all intervals</button>
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

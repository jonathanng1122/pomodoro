//TODO: bug total changes when refreshing
import React, { useState, useEffect } from "react";
import {
    startTimerAsync,
    endTimerAsync,
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
import { checkTimerEvent, msToMin } from "./utilities";

export function Timer() {
    const total: any = useAppSelector(selectTotal);
    const currentInterval = useAppSelector(selectCurrentInterval);
    const oldIntervals = useAppSelector(selectOldIntervals);
    // const status = useAppSelector(selectStatus);
    const [currentLength, setCurrentLength] = useState(0);

    // const tasks = useAppSelector();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getIntervalsTodayAsync())
    }, [dispatch]);

    useEffect(() => {
        const setLength = () => {
            if (currentInterval) {
                setCurrentLength(msToMin(Math.floor(Date.now() - currentInterval.start)))
            } else if (currentLength !== 0) {
                setCurrentLength(0)
            }
        }
        setLength();
        const intervalId = setInterval(() => {
            setLength();
        }, 60 * 1000 / 10); // updates every minute

        const pusher = new Pusher(pusherKey, {
            cluster: 'us3'
        });

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
            pusher.unsubscribe("intervals")
        }
    }, [currentInterval, oldIntervals, currentLength, dispatch]);
    return (
        <div>
            <h1>total for today: {msToMin(total)}</h1>
            {(() => {
                if (currentInterval) {
                    return <div>
                        Minutes til end of Pomodoro: {95 - currentLength}
                    </div>
                }
            })()}
            <button onClick={() => {
                if (!currentInterval) {
                    dispatch(startTimerAsync())
                } else {
                    dispatch(endTimerAsync(currentInterval))
                    setCurrentLength(0);
                }
            }}>{!currentInterval ? 'Start' : 'End'}</button>
            {(() => {
                return oldIntervals.map(interval => {
                    const { start } = interval;
                    if (interval.end) {
                        const { end } = interval;
                        const time = msToMin(end - start);
                        //TODO: be able to select a task
                        if (time > 60000) {
                            return <div key={start}>
                                {time} minutes doing TASK
                            </div>
                        }
                    }
                    return <div key={start}></div>
                }).reverse()
            })()}
        </div>
    )
}

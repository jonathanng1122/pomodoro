import React, { useState, useEffect } from "react";
import {
    startTimer,
    endTimer,
    cancelTimer,
    selectTotal,
    selectCurrentInterval,
    selectOldIntervals
} from './timerSlice';
import { useAppSelector, useAppDispatch } from "../../app/hooks";

export function Timer() {
    const total = useAppSelector(selectTotal);
    const currentInterval = useAppSelector(selectCurrentInterval);
    const oldIntervals = useAppSelector(selectOldIntervals);
    //TODO: currentLength
    const [currentLength, setCurrentLength] = useState(0);

    // const tasks = useAppSelector();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentInterval) {
                setCurrentLength(Date.now() - currentInterval.start);
            }
        }, 300); // 300 milliseconds

        return () => {
            clearInterval(intervalId);
        }
    }, [currentInterval]);
    return (
        <div>
            <button onClick={() => dispatch(startTimer())}>Start Timer</button>
            <button onClick={() => {
                dispatch(endTimer())
                setCurrentLength(0);
            }}>End Timer</button>
            <button onClick={() => dispatch(cancelTimer())}>Cancel Timer</button>
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

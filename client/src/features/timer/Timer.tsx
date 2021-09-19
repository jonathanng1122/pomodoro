import React, { useState, useEffect } from "react";
import {
    startTimer,
    endTimer,
    cancelTimer,
    selectTotal,
    selectCurrentInterval
} from './timerSlice';
import { useAppSelector, useAppDispatch } from "../../app/hooks";

export function Timer() {
    const total = useAppSelector(selectTotal);
    const currentInterval = useAppSelector(selectCurrentInterval);
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
        </div>
    )
}

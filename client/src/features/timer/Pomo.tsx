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

import { ReactComponent as PlayIcon } from './images/play.svg'
import { ReactComponent as StopIcon } from './images/stop.svg'
import { ReactComponent as CloseIcon } from './images/close.svg'
import { ReactComponent as TimerIcon } from './images/timer.svg'

export function Timer() {
    const total: any = useAppSelector(selectTotal);
    const currentInterval = useAppSelector(selectCurrentInterval);
    const oldIntervals = useAppSelector(selectOldIntervals);
    // const status = useAppSelector(selectStatus);
    const [currentLength, setCurrentLength] = useState(0);
    const [totalDisplay, setTotalDisplay] = useState(false);

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
        <div style={{ height: "90%" }}>
            <div onClick={() => {
                setTotalDisplay(!totalDisplay)
            }}>
                {(() => {
                    if (totalDisplay) {
                        return <div className="d-inline position-absolute w-100 text-center mt-3">
                            <h4>{msToMin(total)}</h4><p>total minutes today</p>
                        </div>
                    }
                    return <TimerIcon className="position-absolute w-100 m-auto mt-3" />
                })()}
            </div>
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div className="m-auto text-center">
                    {/* <h1>total for today: </h1> */}
                    {(() => {
                        if (currentInterval) {
                            return <div >
                                <h1>
                                    {95 - currentLength}
                                </h1>
                                <p>
                                    minutes remaining
                                </p>
                            </div>
                        } else {
                            return <div >
                                <h1>
                                    {95}
                                </h1>
                                <p>
                                    set minutes
                                </p>
                            </div>
                        }
                    })()}
                    <div onClick={() => {
                        if (!currentInterval) {
                            dispatch(startTimerAsync())
                        } else {
                            dispatch(endTimerAsync(currentInterval))
                            setCurrentLength(0);
                        }
                    }}>{!currentInterval ? <PlayIcon /> : <StopIcon />}</div>
                    {/* {(() => {
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
            })()} */}
                </div>
            </div>
        </div>
    )
}

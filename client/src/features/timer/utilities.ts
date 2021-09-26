import { TimeState } from "./timerSlice"
import _ from 'lodash'
/**
 * 
 * @param bareState 
 * @param interval 
 * @returns true if found an exact match
 */
export const checkTimerEvent = (bareState: { currentInterval?: Interval, intervals: Array<Interval> }, interval: Interval): boolean => {
    if (bareState.currentInterval && _.isEqual(bareState.currentInterval, interval)) {
        return true
    }
    for (let i = 0; i < bareState.intervals.length; i++) {
        if (_.isEqual(bareState.intervals[i], interval)) {
            return true
        }
    }
    return false
}

/**
 * tidys the timer interval state, untidied state can occur with pusher and multiple devices
 * if currentInterval has start and end, then it is moved to the intervals array
 * if currentInterval is empty and the latest interval is incomplete, it is moved to currentInterval
 * @param {*} intervals 
 * @param {*} interval 
 */
export const tidy = (state: TimeState) => {
    const newState = state //for some reason this can't be {...state} // ref is important
    if (state.currentInterval &&
        state.currentInterval.end &&
        state.currentInterval.start) {
        newState.total += state.currentInterval.end - state.currentInterval.start
        newState.intervals = [...state.intervals, state.currentInterval]
        newState.currentInterval = undefined;
    } else if (!state.currentInterval &&
        state.intervals[state.intervals.length - 1] &&
        state.intervals[state.intervals.length - 1].start &&
        !state.intervals[state.intervals.length - 1].end) {
        console.warn('detecting improper set state')
        let lastInterval = newState.intervals.pop();
        newState.currentInterval = lastInterval;
    }

    return newState
}

export const getStartOfDay = (year: number, month: number, date: number, timezoneOffset: number, startOfDayOffset: number): Date => {
    if (typeof year != "number" || typeof date != "number" || typeof month != "number" || typeof timezoneOffset != "number" || typeof startOfDayOffset != "number") {
        return new Date()
    } else {

        let sign = "-"
        if (timezoneOffset < 0) {
            timezoneOffset *= -1
            sign = "+"
        }
        return new Date(year + "-" + formatZeros(month) + "-" + formatZeros(date) + "T" + minutesToTimeString(startOfDayOffset) + sign + minutesToTimeString(timezoneOffset))
    }
}

const formatZeros = (num: number): string => {
    if (num < 10) {
        return "0" + Math.floor(num)
    } else {
        return "" + num
    }
}
const minutesToTimeString = (minutes: number): string => {
    const remainingMinutes = minutes % 60
    const hours = (minutes - remainingMinutes) / 60
    return formatZeros(hours) + ":" + formatZeros(remainingMinutes)
}



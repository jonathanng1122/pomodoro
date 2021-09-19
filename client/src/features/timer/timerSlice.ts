import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"


export interface TimeState {
    currentInterval?: Interval;
    intervals: Array<Interval>;
    total: number;
}

const initialState: TimeState = {
    intervals: [],
    total: 0
}


export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer: (state) => {
            const newInterval: Interval = {
                start: Date.now()
            }
            if (state.currentInterval) {
                throw Error('Can not start timer due to an existing interval already started')
            }
            state.currentInterval = newInterval
        },
        endTimer: (state) => {
            if (!state.currentInterval) {
                throw Error('Can not start timer due to an existing interval already started')
            }
            const start = state.currentInterval.start;
            const end = Date.now();
            state.total = state.total + end - start;
            const retiredInterval = {
                start,
                end
            }
            state.intervals = [...state.intervals, retiredInterval]
            state.currentInterval = undefined;

        },
        cancelTimer: (state) => {
            if (!state.currentInterval) {
                throw Error('Cant cancel a timer that doesnt exist')
            }
            state.currentInterval = undefined
        }
    }
})

export const { startTimer, endTimer, cancelTimer } = timerSlice.actions;

export const selectTotal = (state: RootState): Number => state.timer.total;
export const selectCurrentInterval = (state: RootState): Interval | undefined => state.timer.currentInterval;
export const selectOldIntervals = (state: RootState): Array<Interval> => state.timer.intervals;
export const selectSpecificInterval = (i: number) => (state: RootState): Interval => state.timer.intervals[i];

export default timerSlice.reducer;
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { createNewInterval, getIntervalsToday } from "./TimerAPI"
import { tidy } from "./utilities"
import _ from 'lodash'

export interface TimeState {
    currentInterval?: Interval;
    intervals: Array<Interval>;
    total: number;
    status: 'loading' | 'idle';
}

const initialState: TimeState = {
    intervals: [],
    total: 0,
    status: 'idle'
}

export const getIntervalsTodayAsync = createAsyncThunk(
    'timer/getIntervalsToday',
    async () => {
        const res = await getIntervalsToday()
        return res.data
    }
)

export const startTimerAsync = createAsyncThunk(
    'timer/startTimerAsync',
    async () => {
        const interval: Interval = {
            userId: '612b111b881930941e73e029',
            start: Date.now()
        }
        const res = await createNewInterval(interval)
        return res.data
    }
)
export const updateTimerAsync = createAsyncThunk(
    'timer/updateTimerAsync',
    async (interval: Interval) => {
        const res = await createNewInterval(interval)
        return res.data
    }
)

export const endTimerAsync = createAsyncThunk(
    'timer/endTimerAsync',
    async (interval: Interval) => {
        const newInterval: Interval = {
            start: interval.start,
            end: Date.now()
        }
        if (interval.userId) {
            newInterval.userId = interval.userId
        }
        const res = await createNewInterval(newInterval)
        return res.data
    }
)

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
                throw Error('Can not end timer due to an nonexisting currentInterval')
            }
            const start = state.currentInterval.start;
            const end = Date.now();
            state.total = state.total + end - start;
            tidy(state);
        },
        cancelTimer: (state) => {
            if (!state.currentInterval) {
                throw Error('Cant cancel a timer that doesnt exist')
            }
            state.currentInterval = undefined
        },
        tidyTimer: (state) => {
            tidy(state);
        },
        //updates only if detects a state change from pusher
        updateTimerState: (state, action: PayloadAction<Interval>) => {
            //returns true if done, and false if not
            const updater = (intervalFromState: Interval, interval: Interval): boolean => {
                // have fun with the bugs
                if (_.isEqual(intervalFromState, interval)) {
                    return true;
                } else if (intervalFromState._id === interval._id) {
                    intervalFromState = interval
                    return true;
                }
                return false;
            }
            const interval = action.payload
            if (state.currentInterval && updater(state.currentInterval, interval)) {
                return;
            }
            for (let i = 0; i < state.intervals.length; i++) {
                if (state.currentInterval && updater(state.intervals[i], interval)) {
                    return;
                }
            }
            if (interval.start && interval.end) {
                state.total += interval.end - interval.start;
                state.intervals = [...state.intervals, interval];
                state.currentInterval = undefined;
            } else if (!state.currentInterval) {
                // couldn't find a match so will update the state
                state.currentInterval = interval;
            } else {
                //moves the action.payload in front
                //there may be bugs by doing this
                state.intervals = [...state.intervals, state.currentInterval];
                state.currentInterval = interval;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(startTimerAsync.pending, (state) => {
            if (state.status === 'loading') {
                throw Error('cant do anything if loading')
            }
            state.status = 'loading'
        }).addCase(startTimerAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            if (state.currentInterval) {
                throw Error('Can not start timer due to an existing interval already started')
            }
            state.currentInterval = action.payload.interval
        }).addCase(endTimerAsync.pending, (state) => {
            if (state.status === 'loading') {
                throw Error('cant do anything if loading')
            }
            state.status = 'loading'
        }).addCase(endTimerAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            if (!state.currentInterval) {
                throw Error('Can not end timer due to an nonexisting currentInterval')
            }
            state.currentInterval = action.payload.interval
            tidy(state)
        }).addCase(getIntervalsTodayAsync.pending, (state) => {
            if (state.status === 'loading') {
                throw Error('cant do anything if loading')
            }
            state.status = 'loading'
        }).addCase(getIntervalsTodayAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.total = 0;
            state.intervals = []
            const intervals = action.payload.interval;
            //sets up the intial state based on a given array of intervals
            for (let i = 0; i < intervals.length; i++) {
                let interval = intervals[i];
                if (interval.end && interval.start) {
                    state.total += interval.end - interval.start
                    state.intervals.push(interval)
                } else if (i === intervals.length - 1) {
                    state.currentInterval = intervals[i]
                }
            }
        })
    }
})

export const { startTimer, endTimer, cancelTimer, updateTimerState, tidyTimer } = timerSlice.actions;

export const selectTotal = (state: RootState): Number => state.timer.total;
export const selectStatus = (state: RootState): string => state.timer.status;
export const selectCurrentInterval = (state: RootState): Interval | undefined => state.timer.currentInterval;
export const selectOldIntervals = (state: RootState): Array<Interval> => state.timer.intervals;
export const selectSpecificInterval = (i: number) => (state: RootState): Interval => state.timer.intervals[i];

export default timerSlice.reducer;
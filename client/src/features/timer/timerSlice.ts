import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { createNewInterval, getIntervalsToday } from "./TimerAPI"


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
        console.log(res.data.interval)
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
        console.log(res.data.interval)
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
            const { start, end } = state.currentInterval;
            if (start && end) {
                state.total = state.total + end - start;
                const retiredInterval = {
                    ...state.currentInterval
                }
                state.intervals = [...state.intervals, retiredInterval]
            }
            state.currentInterval = undefined;
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
                console.log(state)
            }


        })
    }
})

export const { startTimer, endTimer, cancelTimer } = timerSlice.actions;

export const selectTotal = (state: RootState): Number => state.timer.total;
export const selectStatus = (state: RootState): string => state.timer.status;
export const selectCurrentInterval = (state: RootState): Interval | undefined => state.timer.currentInterval;
export const selectOldIntervals = (state: RootState): Array<Interval> => state.timer.intervals;
export const selectSpecificInterval = (i: number) => (state: RootState): Interval => state.timer.intervals[i];

export default timerSlice.reducer;
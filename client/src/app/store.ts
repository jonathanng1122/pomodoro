import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import questSlice from '../features/quest/questSlice';
import timerSlice from '../features/timer/timerSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quest: questSlice,
    timer: timerSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"


export interface QuestState {
    title: string;
    task: Array<Task>;
    archived: boolean;
}

const initialState: QuestState = {
    title: 'My first quest',
    task: [
        {
            name: 'Call mom',
            completed: false,
            next: [{
                name: 'Get apple',
                completed: false
            },
            {
                name: 'Get butter',
                completed: false
            }]
        },
        {
            name: 'Call dad',
            completed: false,
            next: [{
                name: 'Fix car',
                completed: false
            }]
        }
    ],
    archived: false
}

export const questSlice = createSlice({
    name: 'quest',
    initialState,
    reducers: {
        changeTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        }
    }
})

export const { changeTitle } = questSlice.actions;

export const selectTitle = (state: RootState): string => state.quest.title;
export const selectTask = (i: number) => (state: RootState): Task => state.quest.task[i];
export const selectTasks = (state: RootState): Array<Task> => state.quest.task;
export default questSlice.reducer;
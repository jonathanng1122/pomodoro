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
            completed: false
        }, {
            name: 'Walk to walmart',
            completed: false
        }, {
            name: 'get run back with bart',
            completed: false
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
        },
        changeTasks: (state, action: PayloadAction<Array<Task>>) => {
            state.task = action.payload
        },
        changeTask: (state, action: PayloadAction<{ num: number, task: Task }>) => {
            state.task[action.payload.num] = action.payload.task;
        }
    }
})

export const { changeTitle, changeTasks, changeTask } = questSlice.actions;

export const selectTitle = (state: RootState): string => state.quest.title;
export const selectTask = (i: number) => (state: RootState): Task => state.quest.task[i];
export const selectTasks = (state: RootState): Array<Task> => state.quest.task;
export default questSlice.reducer;
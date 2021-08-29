import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
export interface QuestState {
    title: string;
}

const initialState: QuestState = {
    title: 'My first quest'
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

export const selectTitle = (state: RootState) => state.quest.title;

export default questSlice.reducer;
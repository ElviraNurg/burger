import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
    location: string;
}


const InitialState:LocationState = {
    location: ''
}

const locationSlice = createSlice({
    name: 'location',
    initialState: InitialState,
    reducers: {
        getLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload
        }
    }
})

export const { getLocation } = locationSlice.actions

export default locationSlice.reducer

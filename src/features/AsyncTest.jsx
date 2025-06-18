import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sendRequest from "../functions/sendRequest";

const initialState = {
    value: 0,
};

export const asyncTest = createAsyncThunk("thunk", async () => {
    const url = "/admins/get";
    const abortController = new AbortController();
    return await sendRequest("get", url, "", abortController);
});

export const asyncSlice = createSlice({
    name: "async",
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(asyncTest.pending, () => {
            // Add user to the state array
            // state.entities.push(action.payload);
            // console.log(state,action);
        }).addCase(asyncTest.fulfilled, (state,action) => {
            // Add user to the state array
            // state.entities.push(action.payload);
            console.log(state,action);
        });
    },
});

// Action creators are generated for each case reducer function
export const { increment } = asyncSlice.actions;

export default asyncSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { viewTopAgentThunk } from "../services/auth-thunks";

const whoSlice = createSlice({
    name: "who",
    initialState: { agent:[] },
    reducers: {},
    extraReducers: {
        [viewTopAgentThunk.fulfilled]: (state, { payload }) => {
            state.agent = payload;
        },
    },
});

export default whoSlice.reducer;


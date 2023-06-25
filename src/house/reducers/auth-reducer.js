import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, profileThunk, updateUserThunk, registerThunk, viewProfileThunk, findAllUserThunk, findUserByIdThunk } from "../services/auth-thunks";


const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null, requestedUser: null, users:[] },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [viewProfileThunk.fulfilled]: (state, { payload }) => {
            state.requestedUser = payload;
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [findAllUserThunk.fulfilled]: (state, { payload }) => {
            state.users = payload;
        },
        [findUserByIdThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
});
export default authSlice.reducer;
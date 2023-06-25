import { createSlice } from "@reduxjs/toolkit";
import {
    createAdThunk,
    findAdsThunk,
} from "../services/ad-thunks";
const initialState = {
    ads: [],
    loading: false,
    reload: false,
};

const adsSlice = createSlice({
    name: "ads",
    initialState,
    extraReducers: {
        [createAdThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.ads.push(payload);
        },
        [findAdsThunk.pending]: (state) => {
            state.loading = true;
            state.ads = [];
        },
        [findAdsThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.ads = payload;
        },
        [findAdsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    },

    reducers: {
        deleteAd(state, action) {
            const index = state.ads.findIndex(
                (ad) => ad._id === action.payload
            );
            state.ads.splice(index, 1);
        },
    },
});
export const { deleteAd, searchAd, createAdPost } =
    adsSlice.actions;
export default adsSlice.reducer;

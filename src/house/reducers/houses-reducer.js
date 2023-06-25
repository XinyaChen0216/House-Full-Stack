import { createSlice } from "@reduxjs/toolkit";
import Fuse from "fuse.js";
import {
  createHouseThunk,
  findHousesThunk,
  findPublicHousesThunk,
  findPublicHousesBySearchThunk
} from "../services/houses-thunks";
const initialState = {
  houses: [],
  publicHouses: [],
  publicHousesBySearch: [],
  loading: false,
  reload: false,
};

const housesSlice = createSlice({
  name: "houses",
  initialState,
  extraReducers: {
    //     [updateTuitThunk.fulfilled]:
    //         (state, { payload }) => {
    //             state.loading = false
    //             const tuitNdx = state.tuits.findIndex((t) => t._id === payload._id)
    //             state.tuits[tuitNdx] = { ...state.tuits[tuitNdx], ...payload }
    //         },
    [createHouseThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.houses.push(payload);
    },
    [findHousesThunk.pending]: (state) => {
      state.loading = true;
      state.houses = [];
    },
    [findHousesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.houses = payload;
    },
    [findHousesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findPublicHousesThunk.pending]: (state) => {
      state.loading = true;
      state.publicHouses = [];
    },
    [findPublicHousesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.publicHouses = payload;
    },
    [findPublicHousesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findPublicHousesBySearchThunk.pending]: (state) => {
      state.loading = true;
      state.publicHousesBySearch = [];
    },
    [findPublicHousesBySearchThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.publicHousesBySearch = payload;
    },
    [findPublicHousesBySearchThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },

  reducers: {
    deleteHouse(state, action) {
      const index = state.houses.findIndex(
        (house) => house._id === action.payload
      );
      state.houses.splice(index, 1);
    },
    searchHouse(state, action) {
      const options = {
        includeScore: false,
        keys: ["address", "city", "state", "zip"],
      };
      const th = [...state.houses, ...state.publicHouses];
      const fuse = new Fuse(th, options);
      if (action.payload.trim().length > 0) {
        state.publicHouses = [];
        const searchResult = fuse.search(action.payload);
        if (searchResult.length === 0) {
          state.houses = [];
        } else {
          let tempRes = [];
          searchResult.forEach((res) => {
            tempRes.push(th[res.refIndex]);
          });
          state.houses = tempRes;
        }
      } else {
        state.reload = !state.reload;
      }
    },
  },
});
export const { deleteHouse, searchHouse, createHousePost } =
  housesSlice.actions;
export default housesSlice.reducer;

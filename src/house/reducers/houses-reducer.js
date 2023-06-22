import { createSlice } from "@reduxjs/toolkit";
// import houses from "./houses.json";
import Fuse from "fuse.js";
import { createHouseThunk, findHousesThunk } from "../services/houses-thunks";
const initialState = {
  // houses: houses,
  houses: [],
  loading: false,
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

    //     [deleteTuitThunk.fulfilled]:
    //         (state, { payload }) => {
    //             state.loading = false
    //             state.tuits = state.tuits.filter(t => t._id !== payload)
    //         },

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
  },

  reducers: {
    // updateLike(state, action) {
    //     const index = state.tuits
    //         .findIndex(tuit =>
    //             tuit._id === action.payload);
    //     state.tuits[index].liked = !state.tuits[index].liked
    //     if (state.tuits[index].liked) {
    //         state.tuits[index].likes++;
    //     } else state.tuits[index].likes--;
    // },
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

      const fuse = new Fuse(state.houses, options);
      if (action.payload.trim().length > 0) {
        const searchResult = fuse.search(action.payload);
        if (searchResult.length === 0) state.houses = [];
        else {
          let tempRes = [];
          searchResult.forEach((res) => {
            tempRes.push(state.houses[res.refIndex]);
          });
          state.houses = tempRes;
        }
      } else {
        state.houses = initialState.houses;
      }
    },
    // createHousePost(state, action) {
    //   state.houses.unshift({
    //     ...action.payload,
    //     images: ["SpaceX.png"], // will be removed once hook up with api
    //     status: "avtive",
    //     _id: new Date().getTime(),
    //   });
    // },
  },
});
export const { deleteHouse, searchHouse, createHousePost } =
  housesSlice.actions;
export default housesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import houses from "./houses.json";
// import { updateTuitThunk, createTuitThunk, deleteTuitThunk, findTuitsThunk } from "../services/tuits-thunks";
const initialState = {
  houses: houses,
  loading: false,
};

const housesSlice = createSlice({
  name: "houses",
  initialState,
  // extraReducers: {
  //     [updateTuitThunk.fulfilled]:
  //         (state, { payload }) => {
  //             state.loading = false
  //             const tuitNdx = state.tuits.findIndex((t) => t._id === payload._id)
  //             state.tuits[tuitNdx] = { ...state.tuits[tuitNdx], ...payload }
  //         },

  //     [createTuitThunk.fulfilled]:
  //         (state, { payload }) => {
  //             state.loading = false
  //             state.tuits.push(payload)
  //         },

  //     [deleteTuitThunk.fulfilled]:
  //         (state, { payload }) => {
  //             state.loading = false
  //             state.tuits = state.tuits.filter(t => t._id !== payload)
  //         },

  //     [findTuitsThunk.pending]:
  //         (state) => {
  //             state.loading = true
  //             state.tuits = []
  //         },
  //     [findTuitsThunk.fulfilled]:
  //         (state, { payload }) => {
  //             state.loading = false
  //             state.tuits = payload
  //         },
  //     [findTuitsThunk.rejected]:
  //         (state, action) => {
  //             state.loading = false
  //             state.error = action.error
  //         }
  // },

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
    // deleteTuit(state, action) {
    //     const index = state.tuits
    //         .findIndex(tuit =>
    //             tuit._id === action.payload);
    //     state.tuits.splice(index, 1);
    // },
    // createTuit(state, action) {
    //     state.tuits.unshift({
    //         ...action.payload,
    //         ...templateTuit,
    //         _id: (new Date()).getTime(),
    //     })
    // }
  },
});
export const { createTuit, deleteTuit, updateLike } = housesSlice.actions;
export default housesSlice.reducer;

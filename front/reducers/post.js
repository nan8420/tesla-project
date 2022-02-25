import { createSlice } from "@reduxjs/toolkit";
import _concat from "lodash/concat";
import _remove from "lodash/remove";
import _find from "lodash/find";
import { addsupport, loadsupports } from "../actions/post";

export const initialState = {
  supports: [],
  singlePost: null,
  loadsupportsLoading: false,
  loadsupportsDone: false,
  loadsupportsError: null,
  addsupportLoading: false,
  addsupportDone: false,
  addsupportError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  // reducers: {
  //   removeImage(state, action) {
  //     state.imagePaths = state.imagePaths.filter(
  //       (v, i) => i !== action.payload
  //     );
  //   },
  // },
  extraReducers: (builder) =>
    builder
      // 게시물 불러오기
      .addCase(loadsupports.pending, (state) => {
        state.loadsupportsLoading = true;
        state.loadsupportsDone = false;
        state.loadsupportsError = null;
      })
      .addCase(loadsupports.fulfilled, (state, action) => {
        state.loadsupportsLoading = false;
        state.loadsupportsDone = true;
        state.supports = _concat(state.supports, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadsupports.rejected, (state, action) => {
        state.loadsupportsLoading = false;
        state.loadsupportsError = action.error.message;
      })

      // 게시물 추가
      .addCase(addsupport.pending, (state) => {
        state.addsupportLoading = true;
        state.addsupportDone = false;
        state.addsupportError = null;
      })
      .addCase(addsupport.fulfilled, (state, action) => {
        state.addsupportLoading = false;
        state.addsupportDone = true;
        state.supports.unshift(action.payload);
      })
      .addCase(addsupport.rejected, (state, action) => {
        state.addsupportLoading = false;
        state.addsupportError = action.error.message;
      })

      .addDefaultCase((state) => state),
});

export default postSlice;

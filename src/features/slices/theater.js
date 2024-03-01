import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import {
  deleteTheater,
  getAllTheaters,
  updateTheater,
} from '../actions/theater';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  errorMessage: '',
  theaterData: [],
};

const theaterSlice = createSlice({
  name: 'theater',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllTheaters.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.isUpdated = false;
      })
      .addCase(getAllTheaters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = '';
        state.theaterData = action.payload.data;
      })
      .addCase(getAllTheaters.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteTheater.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(deleteTheater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
      })
      .addCase(deleteTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
        state.theaterData = state.theaterData.filter(
          (theater) => theater._id !== action?.payload?.payload
        );
      })
      .addCase(updateTheater.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateTheater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
      })
      // .addCase(updateTheater.pending, (state, action) => {})
      .addCase(updateTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      });
  },
});

export default theaterSlice.reducer;
export const {} = theaterSlice.actions;

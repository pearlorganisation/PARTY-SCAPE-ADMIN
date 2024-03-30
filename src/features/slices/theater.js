import { createSlice } from '@reduxjs/toolkit';
import {
  deleteTheater,
  getAllTheaters,
  updateTheater,
  createTheater
} from '../actions/theater';
import toast from 'react-hot-toast';

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
        console.log("API Response Payload:", action.payload);
        state.theaterData = action.payload.data;
        console.log("Reducer - Updated theaterData:", state.theaterData);
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
      .addCase(updateTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      })

      .addCase(createTheater.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(createTheater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.theaterData = action.payload.data;
        toast.success("Theater Added successfully", {
          position: "top-right",
        });
      })
     
      .addCase(createTheater.rejected, (state, action) => {
        state.isLoading = false;
      
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the theater.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

export default theaterSlice.reducer;
export const {} = theaterSlice.actions;

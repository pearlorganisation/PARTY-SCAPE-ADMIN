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
  isDeleted: false,
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
        // console.log("Reducer - Updated theaterData:", state.theaterData);
      })
      .addCase(getAllTheaters.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteTheater.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
        state.isDeleted = false;
      })
      .addCase(deleteTheater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.isDeleted=true;
        toast.success("Deleted Successfully",{
          position:"top-center"
        })
      })
      .addCase(deleteTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
        state.isDeleted = false;
        state.theaterData = state.theaterData.filter(
          (theater) => theater._id !== action?.payload?.payload
        );
        toast.error(state?.errorMessage, {
          position: "top-center",
        });
      })
      .addCase(updateTheater.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateTheater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.theaterData = action.payload.data;
        toast.success("Updated Theater Successfully",{
          position:"top-center"
        })
      })
      .addCase(updateTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload || 'An error occurred while updating the theater.';

        toast.error( action.payload || 'An error occurred while updating the theater.', {
          position: "top-center",
        });
        console.log(action.payload)
      })

      .addCase(createTheater.pending, (state, action) => {
        state.isLoading = true;
  
      })
      .addCase(createTheater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.theaterData = action.payload.data;
       
        toast.success("Theater Added successfully", {
          position: "top-center",
        });
      })
     
      .addCase(createTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the theater.';
        toast.error(state?.errorMessage, {
          position: "top-center",
        });
      });
  },
});

export default theaterSlice.reducer;
export const {} = theaterSlice.actions;

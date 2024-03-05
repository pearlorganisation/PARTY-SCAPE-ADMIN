import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import { deleteTheater, getAllTheaters } from '../actions/theater';

const initialState = {
  isLoading: false,
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
      })
      .addCase(getAllTheaters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        console.log("API Response Payload:", action.payload);
        state.theaterData = action.payload.data;
        console.log("Reducer - Updated theaterData:", state.theaterData);
      })
      .addCase(getAllTheaters.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteTheater.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTheater.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.theaterData = state.theaterData.filter(
          (theater) => theater._id !== action?.payload?.payload
        );
      });
  },
});

export default theaterSlice.reducer;
export const {} = theaterSlice.actions;

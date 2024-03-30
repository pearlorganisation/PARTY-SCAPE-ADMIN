import { createSlice } from '@reduxjs/toolkit';

import {
  deleteBooking,
  getAllBookings,
 
} from '../actions/booking';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  bookingData: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllBookings.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = '';
        console.log('API Response Payload:', action.payload);
        state.bookingData = action.payload.data;
        console.log('Reducer - Updated bookingData:', state.bookingData);
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteBooking.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.bookingData = state.bookingData.filter(
          (booking) => booking._id !== action?.payload?.payload
        );
        toast.success("Product Deleted successfully", {
          position: "top-right",
         }); 
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
        
      });
      
   
      
  },
});

export default bookingSlice.reducer;
export const {} = bookingSlice.actions;

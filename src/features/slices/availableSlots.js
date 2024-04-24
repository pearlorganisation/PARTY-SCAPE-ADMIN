import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllAvailableSlots } from '../actions/availableSlots';

const initialState = {
  isLoading: false,
  errorMessage: '',
  data: [],
};

const availableSlotSlice = createSlice({
  name: 'availableSlots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAvailableSlots.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllAvailableSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllAvailableSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.data;
      });
  },
});

export default availableSlotSlice.reducer;

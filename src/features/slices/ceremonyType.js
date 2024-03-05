import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';

import { getAllCeremonyType } from '../actions/ceremonyType';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  errorMessage: '',
  dataList: [],
};

const ceremonyTypeSlice = createSlice({
  name: 'ceremonyType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCeremonyType.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCeremonyType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataList = action.payload.data;
      })
      .addCase(getAllCeremonyType.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default ceremonyTypeSlice.reducer;
export const {} = ceremonyTypeSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

import {
  deleteProspectiveCustomer,
  getAllProspectiveCustomers,
} from '../actions/prospectiveCustomer';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isDeleted: false,
  totalPages: 1,
  errorMessage: '',
  prospectiveCustomerData: [],
};

const prospectiveCustomerSlice = createSlice({
  name: 'prospectiveCustomer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllProspectiveCustomers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProspectiveCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prospectiveCustomerData = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllProspectiveCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      .addCase(deleteProspectiveCustomer.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteProspectiveCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
      })
      .addCase(deleteProspectiveCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.isDeleted = false;
        state.prospectiveCustomerData = state.prospectiveCustomerData.filter(
          (prospectiveCustomer) =>
            prospectiveCustomer._id !== action?.payload?.payload
        );
      });
  },
});

export default prospectiveCustomerSlice.reducer;
export const {} = prospectiveCustomerSlice.actions;

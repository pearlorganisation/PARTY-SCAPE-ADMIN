import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import { deleteCake, getAllCakes } from '../actions/cake';

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  cakeData: [],
};

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllCakes.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getAllCakes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.cakeData = action.payload.data;
      })
      .addCase(getAllCakes.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteCake.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCake.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCake.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.cakeData = state.cakeData.filter(
          (cake) => cake._id !== action?.payload?.payload
        );
      });
  },
});


export default cakeSlice.reducer;
export const {} = cakeSlice.actions;

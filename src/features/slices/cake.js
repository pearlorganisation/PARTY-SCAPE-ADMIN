import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import { createCake, deleteCake, getAllCakes, updateCake } from '../actions/cake';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isDeleted:false,
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
        
      })
      .addCase(getAllCakes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cakeData = action.payload.data;
      })
      .addCase(getAllCakes.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      
      .addCase(createCake.pending, (state, action) => {
        state.isLoading = true;
       state.isSuccess=false
      })
      .addCase(createCake.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess=false
        
        state.cakeData = action.payload.data;
      })
      .addCase(createCake.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess=false
        state.errorMessage = action.payload;
      })
      .addCase(updateCake.pending, (state, action) => {
        state.isLoading = true;
       state.isSuccess=false
      })
      .addCase(updateCake.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess=false
        
        state.cakeData = action.payload.data;
      })
      .addCase(updateCake.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess=false
        state.errorMessage = action.payload;
      })
      .addCase(deleteCake.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted=false;
      })
      .addCase(deleteCake.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted=true;
      })
      .addCase(deleteCake.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.isDeleted=false;
        state.cakeData = state.cakeData.filter(
          (cake) => cake._id !== action?.payload?.payload
        );
      });
  },
});


export default cakeSlice.reducer;
export const {} = cakeSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Signup, login, logout } from '../actions/authenticationActions';
// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isOtpSentSuccessfully: false,
  isLogInSuccess: false,
  isLogoutSuccess: false,
  isUserLoggedIn: false,
  loggedInUserData: {},
  isOtpVerified: false,
  isOtpMailSent: false,
  isPasswordReset: false,
  isMailSent: false,
};

// -------------------------------------- Slices------------------------------------------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSignUpState: (state) => {
      state.userSignedSuccess = false;
      state.otpGenerated = false;
      state.isLoading = false;
      state.isOtpVerified = false;
      state.forgetPasswordOtpValid = null;
    },
    clearLoginUpState: (state) => {
      state.isOtpSentSuccessfully = false;
    },
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(Signup.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.userSignedSuccess = false;
        state.isMailSent = false;
      })
      .addCase(Signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userSignedSuccess = true;
        state.isMailSent = false;
        toast.success(`Sign Up Successfull.`, {
          position: 'top-center',
        });
      })
      .addCase(Signup.rejected, (state, action) => {
        state.isLoading = false;
        state.userSignedSuccess = false;
        state.isMailSent = false;
        state.errorMessage = action.payload;
        toast.error('Internal server error', { position: 'top-center' });
      })

      // login cases
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedInUserData = action.payload;
        state.isUserLoggedIn = true;
        state.isLogInSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: 'top-right',
        });
      })

      // Logout lifecycle methods
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = '';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = '';
        state.isOtpSentSuccessfully = false;
        state.isLogInSuccess = false;
        state.isLogoutSuccess = true;
        state.isUserLoggedIn = false;
        state.loggedInUserData = null;
        state.isOtpVerified = false;
        state.isOtpMailSent = false;
        state.isPasswordReset = false;
        localStorage.clear();
        sessionStorage.clear();
        localStorage.removeItem('persist:root');
        toast.success('Logout Successfully', {
          position: 'top-center',
        });
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: 'top-right',
        });
      });
  },
});

// ===========================================Exports==================================================
export default authSlice.reducer;
export const {
  resetFields,
  clearReduxStoreData,
  clearSignUpState,
  clearLoginUpState,
} = authSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import {logIn,logout,} from "../actions/authenticationActions";
import toast from "react-hot-toast";
// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  isLogInSuccess: false,
  isLogoutSuccess: false,
  isUserLoggedIn: false,
  loggedInUserData: {},
  userData :[],
  
  loginData :[],
};

// -------------------------------------- Slices------------------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginUpState: (state) => {
     
    },
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
    
   
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = "";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedInUserData = action.payload;
        state.isUserLoggedIn = true;
        state.isLogInSuccess = true;
        state.loginData =action.payload.data
        toast.success("Log in Successfully",{
          position:"top-center"
        })
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-center",
        });
      })

      // Logout lifecycle methods
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isLogInSuccess = false;
        state.isLogoutSuccess = true;
        state.isUserLoggedIn = false;
        state.loggedInUserData = null;
        localStorage.clear();
        sessionStorage.clear();
        localStorage.removeItem("persist:root");
        toast.success("Logout Successfully", {
          position: "top-center",
        });
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

// ===========================================Exports==================================================
export default authSlice.reducer;
export const {
  resetFields,
  clearReduxStoreData,
  clearLoginUpState,
} = authSlice.actions;

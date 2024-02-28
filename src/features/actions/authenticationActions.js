import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';

// ------------------------------------Async Actions----------------------------------

//Signup send OTP and verify Otp Api bith in single Api
export const generateSignupOTP = createAsyncThunk(
  'auth/sendOtpForSignUp',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post('mail/generateSignUpOtp', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Signup Api
export const Signup = createAsyncThunk(
  'user/sinup',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        'http://localhost:8000/api/v1/auth/signup',
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Fetch signUp data:::', response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

//login
export const login = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        'http://localhost:8000/api/v1/auth/login',
        payload,
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//export con
// logout -- logout action to call the logout api
export const logout = createAsyncThunk(
  'auth/logout',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        'http://localhost:8000/api/v1/auth/logout',
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

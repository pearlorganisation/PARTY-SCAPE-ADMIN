
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all booking api
export const getAllBookings = createAsyncThunk(
  'getBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/bookings', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete booking api
export const deleteBooking = createAsyncThunk(
  'deleteBooking',
  async (id, { rejectWithValue }) => {
    try {
 
      const response = await instance.delete(
        `/bookings/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


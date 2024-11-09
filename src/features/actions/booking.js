import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all booking api
export const getAllBookings = createAsyncThunk(
  'getBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/bookings?search=${payload.search || ''}&filter=${payload.filter || ''}&page=${payload.page ?? 1}`,
        {
          withCredentials: true,
        }
      );
      console.log(data)

      return {
        data: data?.data ? data.data : [], 
        totalPages: data?.totalCount ?  Math.ceil(data.totalCount / 10) : 1, 
        status: data?.status || false, 
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//get all booking api
export const fetchNextPageBookings = createAsyncThunk(
  'getNextBookings',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/bookings?search=${payload.search || ''}&filter=${payload.filter || ''}&page=${payload.page ?? 1}`,
        {
          withCredentials: true,
        }
      );
      console.log(data)

      return {
        data: data?.data ? data.data : [], 
        totalPages: data?.totalCount ?  Math.ceil(data.totalCount / 10) : 1, 
        status: data?.status || false, 
      }
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

//offline booking
export const offlineBooking = createAsyncThunk(
  'newOfflineBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        '/bookings/offlineBooking',
        payload,
        {
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);

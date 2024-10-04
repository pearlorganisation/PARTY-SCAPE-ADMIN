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

      if(data?.data ){
        console.log("nisndfisdfi")
        return {
          data: (data?.data?.[0]?.data && Array.isArray(data?.data?.[0]?.data)) ? data.data[0].data : [], 
          totalPages: (data?.data?.[0]?.totalCount?.[0]?.count !== undefined) ? Math.ceil(data.data[0].totalCount[0].count / 10) : 1, 
          status: data?.status || false, 
        }
      }

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

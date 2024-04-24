import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

export const newOfflineBooking = createAsyncThunk(
  'newOfflineBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        '/offlineBooking',
        { payload },
        { withCredentials: true }
      );
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

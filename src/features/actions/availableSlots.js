import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';

export const getAllAvailableSlots = createAsyncThunk(
  'getAllSlots',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/bookings/availableSlots');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

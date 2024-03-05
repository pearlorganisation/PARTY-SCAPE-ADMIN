import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';

export const getAllCeremonyType = createAsyncThunk(
  'getAllCeremonyType',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/ceremonyType');

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

export const deleteCeremonyType = createAsyncThunk(
  'deleteCeremonyType',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`ceremonyType/${payload}`, {
        withCredentials: true,
      });
      return data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const newCeremonyType = createAsyncThunk(
  'createCeremonyType',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/ceremonyType', payload, {
        withCredentials: true,
      });
      return data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

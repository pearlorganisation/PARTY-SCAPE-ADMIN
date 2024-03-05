import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all cakes api
export const getAllCakes = createAsyncThunk(
  'getCake',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        'http://localhost:8000/api/v1/cake',
        payload,
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete cake api
export const deleteCake = createAsyncThunk(
  'deleteCake',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'payloaad');
      const response = await axios.delete(
        `http://localhost:8000/api/v1/cake/${payload}`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

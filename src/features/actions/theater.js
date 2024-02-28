import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all theater api
export const getAllTheaters = createAsyncThunk(
  'getTheater',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        'http://localhost:8000/api/v1/theater',
        payload,
        {
          withCredentials: true,
        }
      );
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete theater api
export const deleteTheater = createAsyncThunk(
  'deleteTheater',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'payloaad');
      const response = await axios.delete(
        `http://localhost:8000/api/v1/theater/${payload}`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

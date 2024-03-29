import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all theater api
export const getAllTheaters = createAsyncThunk(
  'getTheater',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/theater', payload, {
        withCredentials: true,
      });
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
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await instance.delete(
        `/theater/${id}`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateTheater = createAsyncThunk(
  'updateTheater',
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/theater/${id}`, payload, {
        withCredentials: true,
      });
      return response;
    } catch (e) {
      return rejectWithValue;
    }
  }
);

export const createTheater = createAsyncThunk(
  'createTheater',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/theater`, payload, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
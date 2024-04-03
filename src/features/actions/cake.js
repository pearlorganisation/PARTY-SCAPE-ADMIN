import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all cakes api
export const getAllCakes = createAsyncThunk(
  'getCake',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        '/cake',
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

//create cakes api
export const createCake = createAsyncThunk(
  'createCake',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        '/cake',
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
//update cakes api
export const updateCake = createAsyncThunk(
  'updateCake',
  async ({payload,id} ,{ rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/cake/${id}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

//delete cake api
export const deleteCake = createAsyncThunk(
  'deleteCake',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'payloaad');
      const response = await instance.delete(
        `/cake/${payload}`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';

export const getAllProspectiveCustomers = createAsyncThunk(
  'getAllProspectiveCustomers',
  async ({ page }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/prospectiveCustomers?page=${page}`);

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

//delete prospective customer api
export const deleteProspectiveCustomer = createAsyncThunk(
  'deleteProspectiveCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'payloaad');
      const response = await instance.delete(
        `/prospectiveCustomers/${payload}`,

        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

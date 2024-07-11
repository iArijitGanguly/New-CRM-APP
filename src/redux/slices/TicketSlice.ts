import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import axiosInstance from '../../helpers/axiosInstance';
import { TicketDetails } from '../../types/TicketDetails';
import { TicketState } from '../../types/TicketState';
import { Distribution } from '../../types/TicketState';

const initialState: TicketState = {
  ticketList: [],
  ticketDistribution: {
    open: 0,
    inProgress: 0,
    resolved: 0,
    onHold: 0,
    cancelled: 0
  }
};

export const getAllTickets = createAsyncThunk<AxiosResponse<TicketDetails>>('/tickets/getAllTickets', async () => {
  try {
    const response = axiosInstance.get('getMyAssignedTickets', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    });
    toast.promise(response, {
      loading: 'Fetching tickets belonging to you',
      success: 'Successfully fetched all the tickets',
      error: 'Something went wrong, try again'
    });
    return await response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const TicketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTickets.fulfilled, (state, action) => {
      if(!action?.payload?.data) return;
      state.ticketList = action?.payload?.data?.result;
      state.ticketDistribution = {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0
      };
      state.ticketList.forEach((ticket) => {
        const ticketStatus = ticket.status as Distribution;
        state.ticketDistribution[ticketStatus] = state.ticketDistribution[ticketStatus] + 1;
      });
    });
  }
});

export default TicketSlice.reducer;
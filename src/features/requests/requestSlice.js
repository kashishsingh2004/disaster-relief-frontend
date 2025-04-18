// src/features/requests/requestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching requests
export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests',
    async () => {
        const response = await axios.get('http://localhost:5000/api/requests');
        return response.data;
    }
);

const requestSlice = createSlice({
    name: 'requests',
    initialState: {
        requests: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequests.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.requests = action.payload;
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default requestSlice.reducer;

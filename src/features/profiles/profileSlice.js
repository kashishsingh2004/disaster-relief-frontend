// src/features/profiles/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching profiles
export const fetchProfiles = createAsyncThunk(
    'profiles/fetchProfiles',
    async () => {
        const response = await axios.get('http://localhost:5000/api/profiles');
        return response.data;
    }
);

const profileSlice = createSlice({
    name: 'profiles',
    initialState: {
        profiles: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profiles = action.payload;
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default profileSlice.reducer;

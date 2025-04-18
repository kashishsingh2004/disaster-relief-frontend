import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import requestReducer from '../features/requests/requestSlice';
import newsReducer from '../features/news/newsSlice';
import profileReducer from '../features/profiles/profileSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        requests: requestReducer,
        news: newsReducer,
        profiles: profileReducer,

    },
});

export default store;

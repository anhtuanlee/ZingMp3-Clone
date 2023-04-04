import { configureStore } from '@reduxjs/toolkit';
import {
    featureSlice,
    loginSlice,
    sidebarSlice,
    statusSlice,
    themeSlice,
} from './sliceReducer';

const store = configureStore({
    reducer: {
        feature: featureSlice.reducer,
        status: statusSlice.reducer,
        sidebar: sidebarSlice.reducer,
        theme: themeSlice.reducer,
        login: loginSlice.reducer,
    },
});
export default store;

import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isModalTheme: false,
    },
    reducers: {
        setIsModalTheme: (state, action) => {
            state.isModalTheme = action.payload;
        },
    },
});

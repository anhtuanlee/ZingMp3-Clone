import { createSlice } from '@reduxjs/toolkit';
import { THEME_RECENT_STORAGE } from '../../config/localStorages';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isModalTheme: false,
        titleTheme: undefined,
        themeSelect: THEME_RECENT_STORAGE || {}, 
        isTestTheme: false
    },
    reducers: {
        setIsModalTheme: (state, action) => {
            state.isModalTheme = action.payload;
        },
        setTitleTheme: (state, action) => {
            state.titleTheme = action.payload;
        },
        setTheme: (state, action) => {
            state.themeSelect = action.payload;
        },
        isTestTheme: (state,action) => {
            state.isTestTheme  = action.payload
        }
    },
});

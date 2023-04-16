import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN_STORAGE } from '../../config/localStorages';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false,
        user: {
            data: {},
            accessToken: ACCESS_TOKEN_STORAGE || '',
            listFavorite: [],
        },
    },
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setAccessToken: (state, action) => {
            state.user.accessToken = action.payload;
        },
        setDataUser: (state, action) => {
            state.user.data = action.payload;
        },
        setListSongFavorite: (state, action) => {
            state.user.listFavorite = action.payload;
        },
    },
});

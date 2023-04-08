import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN_STORAGE, LIST_FAVORITE_STORAGE, USER_ID_STORAGE } from '../../config/localStorages';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false,
        user: {
            data: {},
            accessToken: ACCESS_TOKEN_STORAGE || '',
            listFavorite: LIST_FAVORITE_STORAGE || [],
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
            console.log(state.user.data._id , USER_ID_STORAGE)
            if (state.user.data._id !== USER_ID_STORAGE) {
                state.user.listFavorite = [];
            }
        },
        setListSongFavorite: (state, action) => {
            if (action.payload._id) {
                state.user.listFavorite.push(action.payload);
            } else {
                state.user.listFavorite = action.payload;
            }
        },
        setFilterSongFavorite: (state, action) => {
            const filterSong = state.user.listFavorite.filter((item) => {
                return item._id !== action.payload._id;
            });
            state.user.listFavorite = filterSong;
        },
    },
});

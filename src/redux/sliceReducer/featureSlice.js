import { createSlice } from '@reduxjs/toolkit';
import {
    CURRENT_ID_STORAGE,
    CURRENT_TIME_STORAGE,
    DATA_SONGS_RECENT,
    SONG_RECENT_STORAGE,
    VOLUME_STORAGE,
} from '../../config/localStorages';

export const featureSlice = createSlice({
    name: 'feature',
    initialState: {
        dataSongs: DATA_SONGS_RECENT || [],
        volume: VOLUME_STORAGE || 1,
        songCurrent: SONG_RECENT_STORAGE ?? {},
        currentIndex: CURRENT_ID_STORAGE ?? 0,
        times: {
            currentTime: CURRENT_TIME_STORAGE ? CURRENT_TIME_STORAGE : 0,
        },
        slugDataBanner: undefined,
    },
    reducers: {
        setCurrentID: (state, action) => {
            state.currentIndex = action.payload;
        },
        setTimes: (state, action) => {
            state.times = { currentTime: action.payload };
        },
        setSongCurrent: (state, action) => {
            state.songCurrent = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setDataSongs: (state, action) => {
            state.dataSongs = action.payload;
        },
        setSlugDataBanner: (state, action) => {
            state.slugDataBanner = action.payload;
        },
    },
});

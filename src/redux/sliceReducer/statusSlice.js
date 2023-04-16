import {
    IS_RANDOM_STORAGE,
    IS_REPEAT_STORAGE,
    VOLUME_STORAGE,
} from '../../config/localStorages';
import { createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        isPlaying: false,
        isRepeat: IS_REPEAT_STORAGE ?? false,
        isRandom: IS_RANDOM_STORAGE ?? false,
        isLoading: false,
        isPageLoading: false,
        isVolume: VOLUME_STORAGE > 0 ? true : false,
        isRequirePlay: false,
        isMvPlayer: false,
        isSidebarMobile: false,
        isPlayerQueue: false,
        isContentHide: false, // check Container hide and send animation before hide,
        isControlMusicMobile: false, // mobile section control
    },
    reducers: {
        isPlayingChange: (state, action) => {
            state.isPlaying = action.payload;
        },
        isRepeatChange: (state, action) => {
            state.isRepeat = action.payload;
        },
        isRandomChange: (state, action) => {
            state.isRandom = action.payload;
        },
        isLoadingChange: (state, action) => {
            state.isLoading = action.payload;
        },
        isPageLoadingChange: (state, action) => {
            state.isPageLoading = action.payload;
        },
        isVolumeChange: (state, action) => {
            state.isVolume = action.payload;
        },
        isRequirePlayChange: (state, action) => {
            state.isRequirePlay = action.payload;
        },
        isMvPlayerChange: (state, action) => {
            state.isMvPlayer = action.payload;
        },
        isPlayerQueue: (state, action) => {
            state.isPlayerQueue = action.payload;
        },
        isCheckBeforeContentHide: (state, action) => {
            state.isContentHide = action.payload;
        },
        isSidebarMobile: (state, action) => {
            state.isSidebarMobile = action.payload;
        },
        isControlMusicMobile: (state, action) => {
            state.isControlMusicMobile = action.payload;
        },
    },
});

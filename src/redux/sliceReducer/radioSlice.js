import { createSlice } from '@reduxjs/toolkit';

export const radioSlice = createSlice({
    name: 'radio',
    initialState: {
        isPlayingRadio: false,
        urlRadio: '',
        radioDetails: {},
    },
    reducers: {
        setIsPlayingRadio: (state, action) => {
            state.isPlayingRadio = action.payload;
        },
        setUrlRadio: (state, action) => {
            state.urlRadio = action.payload;
        },
        setRadioDetails: (state, action) => {
            state.radioDetails = action.payload;
        },
    },
});

import { createSelector } from '@reduxjs/toolkit';
//controls
export const isPlayingSelector = (state) => state.status.isPlaying;
export const isRepeatSelector = (state) => state.status.isRepeat;
export const isRandomSelector = (state) => state.status.isRandom;
export const isLoadingSelector = (state) => state.status.isLoading;
export const isVolumeSelector = (state) => state.status.isVolume;
export const isRequirePlaySelector = (state) => state.status.isRequirePlay;
//feature
export const songCurrentSelector = (state) => state.feature.songCurrent;
export const slugDataBannerSelector = (state) => state.feature.slugDataBanner;
export const currentIndexSelector = (state) => state.feature.currentIndex;
export const dataSongsSelector = (state) => state.feature.dataSongs;
export const timesSelector = (state) => state.feature.times;
export const volumeSelector = (state) => state.feature.volume;

// sidebar
export const idActiveSidebarSelector = (state) => state.sidebar.idSidebarActive;

//theme
export const isThemeSelector = (state) => state.theme.isModalTheme;

export const combinedStatusSelector = createSelector(
    isPlayingSelector,
    isRepeatSelector,
    isRandomSelector,
    isLoadingSelector,
    isVolumeSelector,
    slugDataBannerSelector,
    isRequirePlaySelector,
    songCurrentSelector,
    currentIndexSelector,
    dataSongsSelector,
    timesSelector,
    volumeSelector,
    idActiveSidebarSelector,
    isThemeSelector,
    (
        isPlaying,
        isRepeat,
        isRandom,
        isLoading,
        isVolume,
        slugDataBanner,
        isRequirePlay,
        songCurrent,
        currentIndex,
        dataSongs,
        times,
        volume,
        idActive,
        isTheme,
    ) => {
        return {
            isPlaying,
            isRepeat,
            isRandom,
            isLoading,
            isVolume,
            slugDataBanner,
            isRequirePlay,
            songCurrent,
            currentIndex,
            dataSongs,
            times,
            volume,
            idActive,
            isTheme,
        };
    },
);

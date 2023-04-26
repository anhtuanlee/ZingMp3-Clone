import { createSelector } from '@reduxjs/toolkit';
//status
export const isPlayingSelector = (state) => state.status.isPlaying;
export const isRepeatSelector = (state) => state.status.isRepeat;
export const isRandomSelector = (state) => state.status.isRandom;
export const isLoadingSelector = (state) => state.status.isLoading;
export const isLoadingPageSelector = (state) => state.status.isPageLoading;
export const isVolumeSelector = (state) => state.status.isVolume;
export const isRequirePlaySelector = (state) => state.status.isRequirePlay;
export const isMvPlayerSelector = (state) => state.status.isMvPlayer;
export const isPlayerQueueSelector = (state) => state.status.isPlayerQueue;
export const isCheckBeforeContentHideSelector = (state) => state.status.isContentHide;
export const isSidebarMobileSelector = (state) => state.status.isSidebarMobile;
export const isControlMusicMobileSelector = (state) => state.status.isControlMusicMobile;
//feature
export const songCurrentSelector = (state) => state.feature.songCurrent;
export const slugDataBannerSelector = (state) => state.feature.slugDataBanner;
export const currentIndexSelector = (state) => state.feature.currentIndex;
export const dataSongsSelector = (state) => state.feature.dataSongs;
export const volumeSelector = (state) => state.feature.volume; 

// sidebar
export const idActiveSidebarSelector = (state) => state.sidebar.idSidebarActive;

//theme
export const isThemeSelector = (state) => state.theme.isModalTheme;
export const titleThemeSelector = (state) => state.theme.titleTheme;
export const themeSelector = (state) => state.theme.themeSelect;
export const isTestThemeSelector = (state) => state.theme.isTestTheme;

// login
export const isLoginSelector = (state) => state.login.isLogin;
export const dataUserSelector = (state) => state.login.user;

export const combinedStatusSelector = createSelector(
    isPlayingSelector,
    isRepeatSelector,
    isRandomSelector,
    isLoadingSelector,
    isLoadingPageSelector,
    isVolumeSelector,
    slugDataBannerSelector,
    isRequirePlaySelector,
    songCurrentSelector,
    currentIndexSelector,
    dataSongsSelector,
    volumeSelector,
    idActiveSidebarSelector,
    isThemeSelector,
    titleThemeSelector,
    themeSelector,
    isTestThemeSelector,
    isMvPlayerSelector,
    isPlayerQueueSelector,
    isCheckBeforeContentHideSelector,
    isLoginSelector,
    dataUserSelector,
    isSidebarMobileSelector,
    isControlMusicMobileSelector, 
    (
        isPlaying,
        isRepeat,
        isRandom,
        isLoading,
        isLoadingPage,
        isVolume,
        slugDataBanner,
        isRequirePlay,
        songCurrent,
        currentIndex,
        dataSongs,
        volume,
        idActive,
        isTheme,
        titleTheme,
        themeSelect,
        isTestTheme,
        isMvPlayer,
        isPlayerQueue,
        isContentHide,
        isLogin,
        dataUser,
        isSidebarMobile,
        isControlMusicMobile, 
    ) => {
        return {
            isPlaying,
            isRepeat,
            isRandom,
            isLoading,
            isLoadingPage,
            isVolume,
            slugDataBanner,
            isRequirePlay,
            songCurrent,
            currentIndex,
            dataSongs,
            volume,
            idActive,
            isTheme,
            titleTheme,
            themeSelect,
            isTestTheme,
            isMvPlayer,
            isPlayerQueue,
            isContentHide,
            isLogin,
            dataUser,
            isSidebarMobile,
            isControlMusicMobile, 
        };
    },
);

// slice selector because when time change will render all selector in combine
export const timesSelector = (state) => state.feature.times;

export const combinedFeatureSelector = createSelector(timesSelector, (times) => {
    return {
        times,
    };
});

const isPlayingRadioSelector = (state) => state.radio.isPlayingRadio;
const urlRadioSelector = (state) => state.radio.urlRadio;
const radioDetailsSelector = (state) => state.radio.radioDetails;

export const combindStatusRadio = createSelector(
    isPlayingRadioSelector,
    urlRadioSelector,
    radioDetailsSelector,
    (isPlayingRadio, urlRadio, radioDetails) => {
        return {
            isPlayingRadio,
            urlRadio,
            radioDetails,
        };
    },
);

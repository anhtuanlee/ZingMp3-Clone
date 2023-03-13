//controls
export const isPlayingSelector = (state) => state.status.isPlaying;
export const isRepeatSelector = (state) => state.status.isRepeat;
export const isRandomSelector = (state) => state.status.isRandom;
export const isLoadingSelector = (state) => state.status.isLoading;
export const isVolumeSelector = (state) => state.status.isVolume;
//feature
export const songCurrentSelector = (state) => state.feature.songCurrent;
export const currentIndexSelector = (state) => state.feature.currentIndex;
export const dataSongsSelector = (state) => state.feature.dataSongs;
export const timesSelector = (state) => state.feature.times;
export const volumeSelector = (state) => state.feature.volume
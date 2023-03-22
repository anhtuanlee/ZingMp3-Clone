import {
    CONTROL_PLAY,
    CONTROL_PAUSE,
    CONTROL_NEXT,
    CONTROL_PREV,
    CONTROL_RANDOM,
    CONTROL_REPEAT,
    CONTROL_VOLUME,
    TIME_DISPLAY,
    PLAYLIST_SONGS,
    CURRENT_INDEX,
    CONTROL_LOADING,
    SONG_CURRENT,
    VOLUME,
    ID_ACTIVE_SIDEBAR,
    CONTROL_CHECKDATABANNER,
    CONTROL_REQUIREPLAY,
} from './constant';

export const playMusic = (data) => {
    return {
        type: CONTROL_PLAY,
        payload: data,
    };
};
export const pauseMusic = (data) => {
    return {
        type: CONTROL_PAUSE,
        payload: data,
    };
};
export const volume = (data) => {
    return {
        type: CONTROL_VOLUME,
        payload: data,
    };
};

export const nextMusic = (index) => {
    return {
        type: CONTROL_NEXT,
        payload: index,
    };
};
export const prevMusic = (index) => {
    return {
        type: CONTROL_PREV,
        payload: index,
    };
};
export const repeatSong = (data) => {
    return {
        type: CONTROL_REPEAT,
        payload: data,
    };
};
export const randomSong = (data) => {
    return {
        type: CONTROL_RANDOM,
        payload: data,
    };
};
export const loading = (data) => {
    return {
        type: CONTROL_LOADING,
        payload: data,
    };
};
export const slugNameCheck = (id) => {
    return {
        type: CONTROL_CHECKDATABANNER,
        payload: id,
    };
};
export const requirePlay = (data) => {
    return {
        type: CONTROL_REQUIREPLAY,
        payload: data,
    };
};
//feature
export const setTimes = (currentTime) => {
    return {
        type: TIME_DISPLAY,
        payload: { currentTime },
    };
};

export const dataSongs = (data) => {
    return {
        type: PLAYLIST_SONGS,
        payload: data,
    };
};
export const currentSong = (data) => {
    return {
        type: SONG_CURRENT,
        payload: data,
    };
};
export const setCurrentID = (data) => {
    return {
        type: CURRENT_INDEX,
        payload: data,
    };
};
export const currentVolume = (vol) => {
    return {
        type: VOLUME,
        payload: vol,
    };
};
export const activeSidebar = (id) => {
    return {
        type: ID_ACTIVE_SIDEBAR,
        payload: id,
    };
};

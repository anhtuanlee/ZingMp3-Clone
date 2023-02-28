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
//feature
export const setTimes = (currentTime, duration) => {
    return {
        type: TIME_DISPLAY,
        payload: { currentTime, duration },
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
        type: 'songcurrent',
        payload:data
    }
}
export const setCurrentID = (data) => {
    return {
        type: CURRENT_INDEX,
        payload: data,
    };
};

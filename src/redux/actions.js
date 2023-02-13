export const playMusic = (data) => {
    return {
        type: 'controls/play',
        payload: data,
    };
};
export const pauseMusic = (data) => {
    return {
        type: 'controls/pause',
        payload: data,
    };
};
export const times = (currentTime, duration) => {
    return {
        type: 'times',
        payload: { currentTime, duration },
    };
};

export const songs = (data) => {
    return {
        type: 'songs',
        payload: data,
    };
};
export const nextMusic = (index) => {    
    return {
        type: 'controls/next',
        payload: index
    };
};
export const prevMusic = (index) => {    
    return {
        type: 'controls/prev',
        payload: index
    };
};

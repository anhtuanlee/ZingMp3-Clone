const initState = {
    isPlaying: false,
    currentIndex: 0,
    songs: [],
    musicFavorite: {},
    times: {},
};

export const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'controls/play':
            return {
                ...state,
                isPlaying: action.payload,
            };
        case 'controls/pause':
            return {
                ...state,
                isPlaying: action.payload,
            };
        case 'times':
            return {
                ...state,
                times: action.payload,
            };
        case 'controls/next':
            return {
                ...state,
                currentIndex: action.payload,
            };
        case 'controls/prev':
            return {
                ...state,
                currentIndex: action.payload,
            };

        case 'songs':
            const songs = action.payload.map((item) => {
                return item.src_music;
            });
            return {
                ...state,
                songs: songs,
            };
        default:
            return state;
    }
};

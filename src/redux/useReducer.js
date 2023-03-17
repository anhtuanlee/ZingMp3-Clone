import {
    CURRENT_ID_STORAGE,
    CURRENT_TIME_STORAGE, DATA_SONGS_RECENT, SONG_RECENT_STORAGE,
    VOLUME_STORAGE,
    _idActiveSidebar,
    _isRandom,
    _isRepeat
} from '../config/localStorages';
import {
    CONTROL_LOADING,
    CONTROL_NEXT,
    CONTROL_PAUSE,
    CONTROL_PLAY,
    CONTROL_PREV,
    CONTROL_RANDOM,
    CONTROL_REPEAT,
    CONTROL_VOLUME,
    CURRENT_INDEX,
    ID_ACTIVE_SIDEBAR,
    PLAYLIST_SONGS,
    SONG_CURRENT,
    TIME_DISPLAY,
    VOLUME
} from './constant';

const initState = {
    status: {
        isPlaying: false,
        isRepeat: _isRepeat ?? false,
        isRandom: _isRandom ?? false,
        isLoading: false,
        isVolume: VOLUME_STORAGE > 0 ? true : false,
    },
    feature: {
        dataSongs: DATA_SONGS_RECENT ?? [],
        volume: VOLUME_STORAGE ?? 0,
        songCurrent: SONG_RECENT_STORAGE ?? {},
        currentIndex: CURRENT_ID_STORAGE ?? 0,
        musicFavorite: {},
        times: {
            currentTime: CURRENT_TIME_STORAGE ? CURRENT_TIME_STORAGE : 0, 
        },
    },
    sidebar: {
        idActive: _idActiveSidebar || 1 ,
    },
};

export const rootReducer = (state = initState, action) => {
    switch (action.type) {
        //controls
        case CONTROL_PLAY:
            return {
                ...state,
                status: {
                    ...state.status,
                    isPlaying: action.payload,
                },
            };
        case CONTROL_PAUSE:
            return {
                ...state,
                status: {
                    ...state.status,
                    isPlaying: action.payload,
                },
            };
        case CONTROL_REPEAT:
            return {
                ...state,
                status: {
                    ...state.status,
                    isRepeat: action.payload,
                },
            };
        case CONTROL_RANDOM:
            return {
                ...state,
                status: {
                    ...state.status,
                    isRandom: action.payload,
                },
            };
        case CONTROL_LOADING:
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoading: action.payload,
                },
            };

        case CONTROL_VOLUME:
            return {
                ...state,
                status: {
                    ...state.status,
                    isVolume: action.payload,
                },
            };
        case SONG_CURRENT:
            return {
                ...state,
                feature: {
                    ...state.feature,
                    songCurrent: action.payload,
                },
            };
        //feature
        case CURRENT_INDEX:
            return {
                ...state,
                feature: {
                    ...state.feature,
                    currentIndex: action.payload,
                },
            };
        case CONTROL_NEXT:
            return {
                ...state,
                feature: {
                    ...state.feature,
                    currentIndex: action.payload,
                },
            };
        case CONTROL_PREV:
            return {
                ...state,
                feature: {
                    ...state.feature,
                    currentIndex: action.payload,
                },
            };

        case TIME_DISPLAY:
            return {
                ...state,
                feature: {
                    ...state.feature,
                    times: action.payload,
                },
            };
        case PLAYLIST_SONGS:
            return {
                ...state,
                feature: {
                    ...state.feature,
                    dataSongs: action.payload,
                },
            };
        case VOLUME:
            return {
                ...state,
                feature: {
                    ...state.feature,
                    volume: action.payload,
                },
            };
        // SideBar
        case ID_ACTIVE_SIDEBAR:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    idActive: action.payload,
                },
            };
        default:
            return state;
    }
};

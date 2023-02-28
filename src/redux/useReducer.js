import { CURRENT_ID, CURRENT_TIME, DURATION, SONG_RECENT } from '../config/localStorages';
import { dataSongs } from './actions';
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
    PLAYLIST_SONGS,
    TIME_DISPLAY,
} from './constant';

console.log(DURATION);
const initState = {
    status: {
        isPlaying: false,
        isRepeat: false,
        isRandom: false,
        isLoading: false,
        isVolume:
            JSON.parse(localStorage.getItem('current_Volume')) > 0
                ? true
                : false,
    },
    feature: {
        currentIndex: CURRENT_ID ? CURRENT_ID : 0,
        dataSongs: [],
        songCurrent: SONG_RECENT ? SONG_RECENT : {},
        musicFavorite: {},
        times: {
            currentTime: CURRENT_TIME,
            duration: DURATION,
        },
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
        case 'songcurrent': 
            return {
                ...state,
                feature: {
                    ...state.feature,
                    songCurrent: state.feature.dataSongs[action.payload],
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
        default:
            return state;
    }
};

export const SONG_RECENT_STORAGE = JSON.parse(
    localStorage.getItem('songRecent'),
); 
export const CURRENT_TIME_STORAGE = JSON.parse(
    localStorage.getItem('currentTime'),
);
export const CURRENT_ID_STORAGE = JSON.parse(
    localStorage.getItem('currentIndex'),
);
export const VOLUME_STORAGE = JSON.parse(
    localStorage.getItem('current_Volume') ?? 0,
);
export const DATA_SONGS_RECENT = JSON.parse(localStorage.getItem('listSongsData'));

export const IS_REPEAT_STORAGE = JSON.parse(localStorage.getItem('isRepeat'));
export const IS_RANDOM_STORAGE = JSON.parse(localStorage.getItem('isRandom'));

export const idActiveSidebar = JSON.parse(
    localStorage.getItem('idActiveSidebar'),
); 
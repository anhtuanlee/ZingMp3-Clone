export const SONG_RECENT_STORAGE = JSON.parse(
    localStorage.getItem('songRecent'),
);
export const DURATION_STORAGE = SONG_RECENT_STORAGE?.seconds;
export const CURRENT_TIME_STORAGE = JSON.parse(
    localStorage.getItem('currentTime'),
);
export const CURRENT_ID_STORAGE = JSON.parse(
    localStorage.getItem('currentIndex'),
);
export const VOLUME_STORAGE = JSON.parse(
    localStorage.getItem('current_Volume') ?? 0,
);
export const DATA_SONGS = JSON.parse(localStorage.getItem('listSongsData'));

export const _isRepeat = JSON.parse(localStorage.getItem('isRepeat'));
export const _isRandom = JSON.parse(localStorage.getItem('isRandom'));

export const _idActiveSidebar = JSON.parse(
    localStorage.getItem('idActiveSidebar'),
); 
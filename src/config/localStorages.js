export const SONG_RECENT =  JSON.parse(localStorage.getItem('songRecent')) 
export const DURATION = SONG_RECENT?.seconds
export const CURRENT_TIME = JSON.parse(localStorage.getItem('currentTime'))
export const CURRENT_ID = JSON.parse(localStorage.getItem('currentIndex'))
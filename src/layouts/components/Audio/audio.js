import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loading,
    dataSongs,
    setTimes,
    setCurrentID,
    currentSong,
} from '../../../redux/actions';
import {
    currentIndexSelector,
    isRepeatSelector,
    isPlayingSelector,
    dataSongsSelector,
    songCurrentSelector,
    timesSelector,
} from '../../../redux/selector';
import { newSongApi } from '../../../services/newSongsApi';
import { CURRENT_TIME } from '../../../config/localStorages';
function Audio({ audioRef }) {
    const [dataSong, setDataSong] = useState([]);
    const dispatch = useDispatch();
    const _isRepeat = useSelector(isRepeatSelector)
    const _isPlay = useSelector(isPlayingSelector);
    const _dataSongs = useSelector(dataSongsSelector);
    const _time = useSelector(timesSelector)
    let _currentIndex = useSelector(currentIndexSelector);
    const _currentSong = useSelector(songCurrentSelector);
    const renderListSongs = _dataSongs.map((item) => {
        return item.src_music;
    });
    //Event
    const handleTimeUpdate = (e) => {
        dispatch(setTimes(e.target.currentTime, e.target.duration));
    };
    const handleCanPlay = () => {
        if (_isPlay) {
            audioRef && audioRef.current.play();
        }
    };
    const handleEndMusic = () => {
        if (_currentIndex < renderListSongs.length - 1) {
            if (_isRepeat) {
                _currentIndex = _currentIndex;
            } else {
                _currentIndex++;
            }
        } else {
            _currentIndex = 0;
        }
        audioRef && audioRef.current.play();
        dispatch(setCurrentID(_currentIndex));
        dispatch(currentSong(_currentIndex));
    };

    useEffect(() => {
        // loading
        dispatch(loading(true));
        const Fetch = async () => {
            const result = await newSongApi().then((data) => {
                setDataSong(data);
                dispatch(dataSongs(data));
                dispatch(loading(false)); 
                localStorage.setItem(
                    'songRecent',
                    JSON.stringify(data[_currentIndex]),
                );
                localStorage.setItem(
                    'currentIndex',
                    JSON.stringify(_currentIndex),
                );
                localStorage.setItem(
                    'currentTime',
                    JSON.stringify(_time.currentTime),
                );
            });
            return result;
        };
        Fetch();
    }, [_currentIndex]);

    return (
        <audio
            ref={audioRef}
            src={_currentSong.src_music || renderListSongs[_currentIndex]}
            onTimeUpdate={(e) => handleTimeUpdate(e)}
            onEnded={handleEndMusic}
            onCanPlay={handleCanPlay}
        />
    );
}

export default Audio;

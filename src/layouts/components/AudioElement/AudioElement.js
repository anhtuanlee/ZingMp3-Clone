import React from 'react';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    currentSong,
    dataSongs,
    loading,
    setCurrentID,
    setTimes,
} from '../../../redux/actions';
import {
    currentIndexSelector,
    dataSongsSelector,
    isPlayingSelector,
    isRepeatSelector,
    songCurrentSelector,
} from '../../../redux/selector';
import { getMusicName, newSongApi } from '../../../services';

function AudioElement(props, ref) {
    const dispatch = useDispatch();
    const _isRepeat = useSelector(isRepeatSelector);
    const _isPlay = useSelector(isPlayingSelector);
    const _dataSongs = useSelector(dataSongsSelector);
    const _currentSong = useSelector(songCurrentSelector);
    let _currentIndex = useSelector(currentIndexSelector);

    const currentSongSlugName = _dataSongs[_currentIndex]?.slug_name_music;
    const renderListSongs = _dataSongs.map((item) => {
        return item.src_music;
    });
    //Event
    const handleTimeUpdate = (e) => {
        dispatch(setTimes(e.target.currentTime, e.target.duration));
        localStorage.setItem(
            'currentTime',
            JSON.stringify(e.target.currentTime),
        );
    };
    const handleCanPlay = () => {
        if (_isPlay) {
            ref && ref.current.play();
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
        dispatch(setCurrentID(_currentIndex));
        dispatch(currentSong(_currentIndex));
    };

    useEffect(() => {
        // get newSong
        const Fetch = async () => {
            if (_dataSongs.length === 0 || _currentSong === undefined) {
                const result = await newSongApi().then((data) => {
                    dispatch(dataSongs(data));
                    dispatch(currentSong(data[_currentIndex]));
                });
                return result;
            }
        };

        Fetch();
    }, []);
    useEffect(() => {
        // get music api
        const fetch = async () => {
            if (currentSongSlugName) {
                dispatch(loading(true));
                const resultSong = await getMusicName(currentSongSlugName).then(
                    (data) => {
                        if (data._id !== _currentSong._id) {
                            dispatch(currentSong(data));
                        }
                        dispatch(loading(false));
                    },
                );
                return resultSong;
            }
        };
        fetch();
    }, [_currentIndex]);

    useEffect(() => {
        localStorage.setItem('songRecent', JSON.stringify(_currentSong));
    }, [_currentSong]);

    return (
        <audio
            ref={ref}
            src={_currentSong?.src_music}
            onTimeUpdate={(e) => handleTimeUpdate(e)}
            onEnded={handleEndMusic}
            onCanPlay={handleCanPlay}
        />
    );
}

export default forwardRef(AudioElement);

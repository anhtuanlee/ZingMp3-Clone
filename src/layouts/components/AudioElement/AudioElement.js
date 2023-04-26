import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAudio } from '../../../hooks';
import { getMusicName, newSongApi } from '../../../services';
import { combinedFeatureSelector, combinedStatusSelector } from '../../../redux/selector';
import { featureSlice, radioSlice, statusSlice } from '../../../redux/sliceReducer';

function AudioElement() {
    const dispatch = useDispatch();
    const { isRepeat, isPlaying, dataSongs, songCurrent, isRandom } =
        useSelector(combinedStatusSelector);
    let { currentIndex } = useSelector(combinedStatusSelector);
    const { times } = useSelector(combinedFeatureSelector);

    const currentSongChange = dataSongs[currentIndex];

    const audioRef = useAudio();

    //Event
    const handleTimeUpdate = () => {
        dispatch(featureSlice.actions.setTimes(audioRef.current.currentTime));

        localStorage.setItem('currentTime', JSON.stringify(audioRef.current.currentTime));
    };
    const handleCanPlay = () => {
        if (isPlaying) {
            audioRef?.current && audioRef?.current.play();
            dispatch(radioSlice.actions.setIsPlayingRadio(false));
            dispatch(radioSlice.actions.setRadioDetails({}));
        } else {
            audioRef?.current && audioRef?.current.pause();
        }
    };
    const handleEndMusic = () => {
        if (isRepeat) {
            dispatch(featureSlice.actions.setTimes({ currentTime: 0 }));
            audioRef?.current.play();
        } else if (isRandom) {
            const randomId = Math.floor(Math.random() * dataSongs.length);
            currentIndex = randomId;
        } else {
            if (currentIndex < dataSongs.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
        }

        dispatch(featureSlice.actions.setCurrentID(currentIndex));
        dispatch(featureSlice.actions.setSongCurrent(dataSongs[currentIndex]));
    };

    useEffect(() => {
        // get newSong when havent data and first time use
        const Fetch = async () => {
            if (dataSongs.length === 0) {
                const result = await newSongApi();
                dispatch(featureSlice.actions.setDataSongs(result));
            }
        };
        Fetch();
    }, []);

    useEffect(() => {
        // get music api
        const fetch = async () => {
            if (currentSongChange) {
                const sluNameSinger = currentSongChange?.slug_name_music;
                dispatch(statusSlice.actions.isLoadingChange(true));

                const resultSong = await getMusicName(sluNameSinger);
                if (
                    resultSong._id !== songCurrent._id &&
                    resultSong._id !== '616c5aecfb6ad80023fc77c7' &&
                    resultSong._id !== '634850bc4880840023e41685' // song same slug_name_music
                ) {
                    dispatch(featureSlice.actions.setSongCurrent(resultSong));
                }
                dispatch(statusSlice.actions.isLoadingChange(false));
            }
        };
        fetch();
    }, [currentSongChange, dispatch]);

    useEffect(() => {
        if (songCurrent) {
            localStorage.setItem('songRecent', JSON.stringify(songCurrent));
            localStorage.setItem('listSongsData', JSON.stringify(dataSongs));
            localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
        }
    }, [songCurrent]);

    useEffect(() => {
        if (times.currentTime) {
            audioRef.current.currentTime = times.currentTime;
        } else {
            audioRef.current.currentTime = 0;
        }
    }, []);
    return (
        <audio
            ref={audioRef}
            controls
            hidden
            autoPlay={isPlaying}
            src={songCurrent?.src_music}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEndMusic}
            onCanPlay={handleCanPlay}
        />
    );
}

export default React.memo(AudioElement);

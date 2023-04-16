import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAudio } from '../../../hooks';
import { getMusicName, newSongApi } from '../../../services';
import { combinedStatusSelector } from '../../../redux/selector';
import { featureSlice, statusSlice } from '../../../redux/sliceReducer';

function AudioElement() {
    const dispatch = useDispatch();
    const { isRepeat, isPlaying, dataSongs, songCurrent, isRandom } =
        useSelector(combinedStatusSelector);

    let { currentIndex } = useSelector(combinedStatusSelector); // ?

    const currentSongChange = dataSongs.length > 0 && dataSongs[currentIndex];
    const audioRef = useAudio();
    //Event
    const handleTimeUpdate = () => {
        dispatch(featureSlice.actions.setTimes(audioRef.current.currentTime));

        localStorage.setItem('currentTime', JSON.stringify(audioRef.current.currentTime));
    };
    const handleCanPlay = () => {
        if (isPlaying) {
            audioRef?.current && audioRef?.current.play();
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
        // get newSong
        const Fetch = async () => {
            if (dataSongs.length === 0) {
                const result = await newSongApi().then((data) => {
                    dispatch(featureSlice.actions.setDataSongs(data));
                    /*   dispatch(featureSlice.actions.setSongCurrent(data[currentIndex])); */
                });

                return result;
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
                const resultSong = await getMusicName(sluNameSinger).then((data) => {
                    if (
                        data._id !== songCurrent._id &&
                        data._id !== '616c5aecfb6ad80023fc77c7' &&
                        data._id !== '634850bc4880840023e41685' // song same slug_name_music
                    ) {
                        dispatch(featureSlice.actions.setSongCurrent(data));
                    }
                    dispatch(statusSlice.actions.isLoadingChange(false));
                });
                return resultSong;
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

    return (
        <audio
            ref={audioRef}
            controls
            hidden
            src={songCurrent?.src_music}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEndMusic}
            onCanPlay={handleCanPlay}
        />
    );
}

export default React.memo(AudioElement);

import { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { times } from '../../../redux/actions';
import { songs, currentIndex } from '../../../redux/selector';
function Audio({ audioRef }) {
    const dispatch = useDispatch();
    const songCurrentPlay = useSelector(songs);
    const index = useSelector(currentIndex);
    const handleTimeUpdate = (e) => {
        dispatch(times(e.target.currentTime, e.target.duration));
    };

  
   
    return (
        <audio
            ref={audioRef}
            src={songCurrentPlay[index]}
            onTimeUpdate={(e) => handleTimeUpdate(e)}
        />
    );
}

export default Audio;

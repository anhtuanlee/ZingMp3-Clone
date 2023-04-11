import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_TIME_STORAGE, SONG_RECENT_STORAGE } from '../../../config/localStorages';
import { combinedFeatureSelector, combinedStatusSelector } from '../../../redux/selector';
import { featureSlice, statusSlice } from '../../../redux/sliceReducer';
import styles from './InputProgress.module.scss';
const cx = classNames.bind(styles);

function InputProgress({
    max,
    step,
    min,
    style,
    classes,
    audioRef,
    audioType,
    volumeType, 
}) {
    const dispatch = useDispatch();
    const { isVolume, songCurrent, volume } = useSelector(combinedStatusSelector);
    const { times } = useSelector(combinedFeatureSelector);
    const progressRef = useRef();

    const [valueTime, setValue] = useState(() => {
        const percentValue = Math.floor(
            (CURRENT_TIME_STORAGE / SONG_RECENT_STORAGE?.seconds) * 100,
        );
        return percentValue ? percentValue : 0;
    });

    const [valueVolume, setValueVolume] = useState(() => {
        return volume * 10;
    });
    const handleTypeInput = (e) => {
        if (audioRef) {
            if (audioType) {
                setValue(e.target.value);
                audioRef.current.currentTime = Math.floor(
                    (progressRef.current.value / 100) * audioRef.current.duration,
                );
            } else if (volumeType) {
                setValueVolume(e.target.value);
                dispatch(
                    statusSlice.actions.isVolumeChange(e.target.value > 0 ? true : false),
                );
                dispatch(featureSlice.actions.setVolume(e.target.value / 10));
                audioRef.current.volume = e.target.value / 10;
                localStorage.setItem(
                    'current_Volume',
                    JSON.stringify(audioRef.current.volume),
                );
            }
        }
    };

    const setBackgroundSizes = () => {
        return {
            ...style,
            backgroundSize: `${
                ((audioType ? (valueTime ? valueTime : 0) : isVolume ? valueVolume : 0) *
                    100) /
                max
            }% 100%`,
        };
    };
    // seektime play
    useEffect(() => {
        if (audioRef) {
            const percentValue = String(
                Math.floor((times.currentTime / songCurrent?.seconds) * 100),
            );
            if (percentValue !== null) {
                setValue(percentValue);
            } else {
                setValue(0);
            }
        }
    }, [times.currentTime, audioRef, songCurrent]);
    useEffect(() => {
        if (audioRef) {
            if (CURRENT_TIME_STORAGE !== null) {
                audioRef.current.currentTime = CURRENT_TIME_STORAGE;
            }
        }
    }, [audioRef]);
    // seek volume
    useEffect(() => {
        if (audioRef) {
            if (isVolume) {
                audioRef.current.volume = valueVolume / 10;
            } else {
                audioRef.current.volume = 0;
                if (!isVolume && valueVolume < 0.1) {
                    // check isVolume false and valueVolume < 0.1 when isVolume change will setValue = 0.1
                    setValueVolume(1);
                } else {
                    audioRef.current.volume = 0;
                }
            }
            dispatch(featureSlice.actions.setVolume(audioRef.current.volume));

            localStorage.setItem(
                'current_Volume',
                JSON.stringify(audioRef.current.volume),
            );
        }
    }, [isVolume, dispatch]);
    return (
        <input
            type="range"
            value={audioType ? (valueTime ? valueTime : 0) : isVolume ? valueVolume : 0}
            max={max}
            min={min}
            step={step}
            onInput={(e) => handleTypeInput(e)}
            style={setBackgroundSizes()}
            className={cx('progress_input', classes)}
            ref={progressRef}
        />
    );
}
InputProgress.propTypes = {
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    min: PropTypes.number,
    onHandle: PropTypes.func,
};

InputProgress.defaultProps = {
    max: 100,
    step: 1,
    min: 0,
    classes: '',
};
export default InputProgress;

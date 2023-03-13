import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InputProgress.module.scss';
import PropTypes from 'prop-types';
import { currentVolume, volume } from '../../../redux/actions';
import {
    isVolumeSelector,
    timesSelector,
    volumeSelector,
} from '../../../redux/selector';
import { useDispatch, useSelector } from 'react-redux';
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
    const _times = useSelector(timesSelector);
    const _isVolume = useSelector(isVolumeSelector);
    const volumeCurrent = useSelector(volumeSelector);
    const progressRef = useRef();

    const [valueTime, setValue] = useState(() => {
        const seekTime = JSON.parse(localStorage.getItem('currentTime'));
        const duration = JSON.parse(
            localStorage.getItem('songRecent'),
        )?.seconds;
        const percentValue = Math.floor((seekTime / duration) * 100);
        return percentValue ? percentValue : 0;
    });

    const [valueVolume, setValueVolume] = useState(() => {
        return volumeCurrent * 10;
    });

    const handleTypeInput = (e) => {
        if (audioRef) {
            if (audioType) {
                setValue(e.target.value);
                audioRef.current.currentTime = Math.floor(
                    (progressRef.current.value / 100) *
                        audioRef.current.duration,
                );
            } else if (volumeType) {
                setValueVolume(e.target.value);
                dispatch(volume(e.target.value > 0 ? true : false));
                dispatch(currentVolume(e.target.value / 10));
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
                ((audioType ? valueTime : _isVolume ? valueVolume : 0) * 100) /
                max
            }% 100%`,
        };
    };

    // seektime play
    useEffect(() => {
        if (audioRef) {
            const percentValue = String(
                Math.floor((_times.currentTime / _times.duration) * 100),
            );
            if (percentValue !== null) {
                setValue(percentValue);
            }
        }
    }, [_times.currentTime]);
    useEffect(() => {
        if (audioRef) {
            const recentValue = JSON.parse(localStorage.getItem('currentTime'));

            if (recentValue !== null) {
                audioRef.current.currentTime = String(recentValue);
            }
        }
    }, []);

    // seek volume
    useEffect(() => {
        if (audioRef) {
            if (_isVolume) {
                audioRef.current.volume = valueVolume / 10;
            } else {
                audioRef.current.volume = 0;
                if (!_isVolume && valueVolume === 0) {
                    // check _isVolume false and valueVolume < 0.1 when _isVolume change will setValue = 0.1
                    setValueVolume(1);
                } else {
                    audioRef.current.volume = 0;
                }
            }
            dispatch(currentVolume(audioRef.current.volume));

            localStorage.setItem(
                'current_Volume',
                JSON.stringify(audioRef.current.volume),
            );
        }
    }, [_isVolume]);
    return (
        <input
            type="range"
            value={audioType ? valueTime : _isVolume ? valueVolume : 0}
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

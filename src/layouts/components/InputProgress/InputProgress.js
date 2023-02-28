import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InputProgress.module.scss';
import PropTypes from 'prop-types';
import { volume } from '../../../redux/actions';
import { isVolumeSelector, timesSelector } from '../../../redux/selector';
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
    const progressRef = useRef();
    const [valueTime, setValue] = useState(_times.currentTime);
    const [valueVolume, setValueVolume] = useState(() => {
        const seekVolume = JSON.parse(localStorage.getItem('current_Volume'));
        return seekVolume ? seekVolume * 10 : 1;
    });
    const handleTypeInput = (e) => {
        if (audioRef) {
            if (audioType) {
                setValue(e.target.value);
                audioRef.current.currentTime =
                    (progressRef.current.value / 100) *
                    audioRef.current.duration;
            } else if (volumeType) {
                setValueVolume(e.target.value);
                dispatch(volume(e.target.value > 0 ? true : false));
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
            setValue(
                _times.currentTime
                    ? (_times.currentTime / _times.duration) * 100
                    : 0,
            );
        }
    }, [_times.currentTime]);

    // seek volume
    useEffect(() => {
        if (audioRef) {
            if (_isVolume) {
                audioRef.current.volume = valueVolume / 10;
            } else {
                const valueSlient = 0;
                audioRef.current.volume = valueSlient;
            }
            localStorage.setItem(
                'current_Volume',
                JSON.stringify(audioRef.current.volume),
            );
        }
    }, [_isVolume]);
    return (
        <input
            type="range"
            value={audioType ? valueTime : _isVolume === true ? valueVolume : 0}
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

import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InputProgress.module.scss';
import PropTypes from 'prop-types';
import { times } from '../../../redux/selector';
import { useDispatch, useSelector } from 'react-redux'; 
const cx = classNames.bind(styles);

function InputProgress({ max, step, min, style, classes, audioRef }) {
    const timeSeek = useSelector(times);
    const dispatch = useDispatch();

    const progressRef = useRef();

    const [value, setValue] = useState(0);

    const handleTypeInput = (e) => {
        setValue(e.target.value);
        audioRef.current.currentTime =
            (progressRef.current.value / 100) * audioRef.current.duration;
    };
    const setBackgroundSizes = () => {
        return { ...style, backgroundSize: `${(value * 100) / max}% 100%` };
    };
    useEffect(() => {
        // seektime play
        if (audioRef) {
            setValue(
                timeSeek.currentTime
                    ? (timeSeek.currentTime / timeSeek.duration) * 100
                    : 0,
            );
        }
    }, [timeSeek.currentTime]);
    return (
        <input
            type="range"
            value={value}
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

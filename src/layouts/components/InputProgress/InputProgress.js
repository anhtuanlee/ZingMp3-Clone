import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InputProgress.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function InputProgress({ max, step, min, onHandle }) {
    const [value, setValue] = useState(0);

    const handleTypeInput = (e) => {
        setValue(e.target.value);
    };
    const setBackgroundSizes = () => {
        return { backgroundSize: `${(value * 100) / max}% 100% ` };
    };
    return (
        <input
            type="range"
            value={value}
            max={max}
            min={min}
            step={step}
            onChange={(e) => handleTypeInput(e)}
            style={setBackgroundSizes()}
            className={cx('progress_input')}
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
    max: 10,
    step: 1,
    min: 0,
};
export default InputProgress;

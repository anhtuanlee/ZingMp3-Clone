import ControlsLeft from './ControlsLeft';
import ControlsCenter from './ControlsCenter';
import ControlsRight from './ControlsRight';
import styles from './Controls.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Controls({ audioRef }) {
    return (
        <div className={cx('wrapper')}>
            <ControlsLeft />
            <ControlsCenter audioRef={audioRef} />
            <ControlsRight audioRef={audioRef} />
        </div>
    );
}

export default Controls;

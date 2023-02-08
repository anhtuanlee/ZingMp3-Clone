import ControlsLeft from './ControlsLeft';
import ControlsCenter from './ControlsCenter';
import ControlsRight from './ControlsRight';
import styles from './Controls.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);
function Controls({ children }) {
    return (
        <div className={cx('wrapper')}>
            <ControlsLeft />
            <ControlsCenter />
            <ControlsRight />
        </div>
    );
}

export default Controls;

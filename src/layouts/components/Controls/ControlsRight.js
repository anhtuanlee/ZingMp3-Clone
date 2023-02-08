import styles from './Controls.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ControlsRight() {
    return (
        <div className={cx('player_control_right')}>
            <h2>right</h2>
            <div className={cx('player_controls_right_container')}>
                <div className={cx('controls_item')}>
                    <button></button>
                </div>
                <div className={cx('controls_item')}>
                    <button></button>
                </div>
                <div className={cx('controls_item')}>
                    <button></button>
                </div>
                <div className={cx('controls_item')}>
                    <button></button>
                </div>
            </div>
        </div>
    );
}

export default ControlsRight;

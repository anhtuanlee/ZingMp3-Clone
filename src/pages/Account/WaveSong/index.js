import classNames from 'classnames/bind';
import styles from '../Account.module.scss';

const cx = classNames.bind(styles);
function WaveSong() {
    return (
        <div className={cx('block_container')}>
            <div className={cx('block')}></div>
            <div className={cx('block')}></div>
            <div className={cx('block')}></div>
            <div className={cx('block')}></div>
        </div>
    );
}

export default WaveSong;

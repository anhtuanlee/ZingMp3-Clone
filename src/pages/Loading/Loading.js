import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);
function Loading({ children, styles }) {
    return (
        <div className={cx('skeleton')} style={styles}>
            {children}
        </div>
    );
}

export default Loading;

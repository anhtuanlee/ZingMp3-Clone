import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);
function Loading({ children, styles, className }) {
    return (
        <div className={cx('skeleton', className)} style={styles}>
            {children}
        </div>
    );
}

export default Loading;

import styles from './Menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function MenuItem({}) {
    return (
        <div className={cx('item')}>
            <span>Xin chao </span>
           
        </div>
    );
}

export default MenuItem;

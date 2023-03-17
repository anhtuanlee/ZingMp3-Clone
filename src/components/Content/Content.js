import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import Trending from './Trending/Trending';

const cx = classNames.bind(styles);
function Content() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('trending')}>
                <Trending />
            </div>
        </div>
    );
}

export default Content;

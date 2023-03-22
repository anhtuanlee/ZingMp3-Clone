import classNames from 'classnames/bind';
import AlbumHot from './AlbumHot/AlbumHot';
import styles from './Content.module.scss';
import SingerPopular from './SingerPopular/SingerPopular';
import Trending from './Trending/Trending';
const cx = classNames.bind(styles);
function Content() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('trending')}>
                <Trending />
            </div>
            <div className={cx('singer_popular')}>
                <SingerPopular />
            </div>
            <div className={cx('album_hot')}>
                <AlbumHot />
            </div>
        </div>
    );
}

export default Content;

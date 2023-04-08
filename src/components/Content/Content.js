import classNames from 'classnames/bind';
import { BANNER_ALBUM_HOT, BANNER_SINGER_POPULAR } from '../../redux/constant';
import Container from '../Container/Container';
import styles from './Content.module.scss';
import Trending from './Trending/Trending';
const cx = classNames.bind(styles);

function Content() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('trending')}>
                <Trending />
            </div>
            <div className={cx('singer_popular')}>
                <Container
                    listData={BANNER_SINGER_POPULAR}
                    titleSection="Nghệ Sĩ Thịnh Hành"
                />
            </div>
            <div className={cx('album_hot')}>
                <Container
                    listData={BANNER_ALBUM_HOT}
                    titleSection="Album Hot" 
                />
            </div>
        </div>
    );
}

export default Content;

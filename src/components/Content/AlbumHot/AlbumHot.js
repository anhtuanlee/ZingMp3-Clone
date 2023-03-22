import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { BANNER_ALBUM_HOT } from '../../../redux/constant';
import Banner from '../../Banner/Banner';
import styles from './AlbumHot.module.scss';
const cx = classNames.bind(styles);
function AlbumHot() {
    const render = () => {
        const check = BANNER_ALBUM_HOT.map((item, index) => {
            return (
                <div className={cx('item')} key={index}>
                    <Link
                        to={`album/${item?.slug_category}`}
                        state={{
                            src: item.src,
                            title: item.title,
                            slug_name_singer: item?.slug_name_singer,
                            slug_category: item?.slug_category, // just slug_category to filter
                            isBannerAlbumHot: true, // check bannerAlbumHot request
                        }}
                    >
                        <Banner item={item} index={index} />
                    </Link>

                    <Link
                        to={`album/${item.slug_name_singer}`}
                        state={{
                            src: item.src,
                            title: item.title,
                            slug_name_singer: item?.slug_name_singer,
                            slug_category: item?.slug_category,
                            isBannerAlbumHot: true, // check bannerAlbumHot request
                        }}
                    >
                        <h3 className={cx('item_title')}>{item.title}</h3>
                    </Link>

                    {/* check nameingers  */}

                    {Array.isArray(item.name_data)  ? (
                        item.name_data.map((singer, index) => {
                            const dataLength = item.name_data.length - 1;
                            return (
                                <Link
                                    to={`/${singer.slug_name_singer}`}
                                    key={index}
                                >
                                    <span className={cx('item_extra_title')}>
                                        {singer.name_singer +
                                            (index === dataLength ? '' : ', ')}
                                    </span>
                                </Link>
                            );
                        })
                    ) : (
                        <Link to={`/${item.slug_name_singer}`}>
                            <span className={cx('item_extra_title')}>
                                {item.name_singer}
                            </span>
                        </Link>
                    )}
                </div>
            );
        });
        return check;
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title_section')}> Album HOT</h2>

            <div className={cx('container_singer_popular')}>{render()}</div>
        </div>
    );
}

export default AlbumHot;

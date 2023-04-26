import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { ActionBtnAlbum } from '../../Feature/ActionBtnAlbum';
import Loading from '../../pages/Loading';
import { combinedStatusSelector } from '../../redux/selector';
import Images from '../Image';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

// Component render img banner on home page and albumpage
function Banner({ item, index, data, isLivingAlbum, singleBtn, isPodcast }) {
    const [indexHover, setIndexHover] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const { slugDataBanner, isPlaying, songCurrent, isLoadingPage } =
        useSelector(combinedStatusSelector);

    const isSlugCategory = slugDataBanner === item?.slug_banner_album_hot;
    const isSlugNameSinger = slugDataBanner === item?.slug_banner_singer_popular;
    const isSlugCategoryCurrent =
        songCurrent?.slug_category === item?.slug_banner_album_hot;
    const isSlugNameSingerCurrent =
        songCurrent?.slug_name_singer === item?.slug_banner_singer_popular;

    const isCategoryMatch = isSlugCategory && isSlugCategoryCurrent && isPlaying;
    const isSingerMatch = isSlugNameSinger && isSlugNameSingerCurrent && isPlaying;

    const handleHover = () => {
        if (!isHover) {
            setIndexHover(index);
            setIsHover(true);
        }
    };
    const handleLeave = () => {
        setIsHover(false);
        setIndexHover(null);
    };

    useEffect(() => {
        if (isCategoryMatch || isSingerMatch) {
            setIsHover(true);
            setIndexHover(index);
        }
    });

    useEffect(() => {
        // check when songCurrent change and set isHover false
        if (
            slugDataBanner !== songCurrent?.slug_name_singer ||
            slugDataBanner !== songCurrent?.slug_category
        ) {
            setIndexHover(null);
            setIsHover(false);
        }
    }, [songCurrent]);
    useEffect(() => {
        // set hover banner when play song in banner and not hover when not play song
        if (
            slugDataBanner === item?.slug_banner_singer_popular ||
            slugDataBanner === item?.slug_banner_album_hot
        ) {
            if (!isPlaying) {
                setIndexHover(null);
                setIsHover(false);
            }
        }
    }, [isPlaying]);

    return isLoadingPage ? (
        <Loading
            styles={{
                paddingBottom: '100%',
            }}
        />
    ) : (
        <div className={cx('item')}>
            <div
                className={cx(
                    'item_card',
                    indexHover === index && isHover ? 'isHover' : '',
                )}
                onMouseOver={handleHover}
                onMouseLeave={handleLeave}
            >
                {isPodcast ? (
                    <figure
                        onClick={() =>
                            toast.error('Không thể phát do không gọi được API :< ')
                        }
                        className={cx('item_img')}
                    >
                        <Images src={item?.src || item.thumbnailM} />
                    </figure>
                ) : (
                    <Link
                        to={`/album/${
                            item?.slug_banner_singer_popular ||
                            item?.slug_banner_album_hot
                        }`}
                        state={{
                            src: item?.src,
                            title: item?.title,
                            slug_banner_singer_popular: item?.slug_banner_singer_popular,
                            slug_banner_album_hot: item?.slug_banner_album_hot,
                            isBannerAlbumHot: item?.slug_banner_album_hot ? true : false,
                        }}
                    >
                        <figure className={cx('item_img')}>
                            <Images src={item?.src} />
                        </figure>
                        <div
                            className={cx('item_action_hover')}
                            onMouseOver={handleHover}
                        >
                            {indexHover === index && isHover && !isPodcast && (
                                <ActionBtnAlbum
                                    key={index}
                                    item={item}
                                    isLivingAlbum={isLivingAlbum}
                                    data={data}
                                    singleBtn={singleBtn}
                                    index={index}
                                />
                            )}
                        </div>
                    </Link>
                )}
            </div>
            {!isLivingAlbum && !isPodcast && (
                <div>
                    <Link
                        title={item.title}
                        to={`album/${
                            item?.slug_banner_singer_popular ||
                            item?.slug_banner_album_hot
                        }`}
                        state={{
                            src: item.src,
                            title: item.title,
                            slug_banner_singer_popular: item?.slug_banner_singer_popular,
                            slug_banner_album_hot: item?.slug_banner_album_hot,
                            isBannerAlbumHot: item?.slug_banner_album_hot ? true : false,
                        }}
                    >
                        <h3 className={cx('item_title')}>{item.title}</h3>
                    </Link>
                    <span className={cx('item_extra_title')} key={index}>
                        {Array.isArray(item.name_data) ? (
                            item.name_data.map((singer, index) => {
                                const dataLength = item.name_data.length - 1;
                                return (
                                    <Link to={`/${singer?.slug_name_singer}`} key={index}>
                                        {singer.name_singer +
                                            (index === dataLength ? '' : ', ')}
                                    </Link>
                                );
                            })
                        ) : (
                            <Link to={`/${item?.slug_banner_singer_popular}`}>
                                {item.name_singer}
                            </Link>
                        )}
                    </span>
                </div>
            )}
            {isPodcast && (
                <h3
                    onClick={() =>
                        toast.error('Không thể phát do không gọi được API :< ')
                    }
                    className={cx('item_title')}
                >
                    {item.title}
                </h3>
            )}
        </div>
    );
}

export default Banner;

Banner.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    data: PropTypes.array,
    isLivingAlbum: PropTypes.bool,
    singleBtn: PropTypes.bool,
};

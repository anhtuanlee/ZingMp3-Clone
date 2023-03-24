import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ActionBtnAlbum } from '../../Feature/ActionBtnAlbum';
import {
    combinedStatusSelector
} from '../../redux/selector';
import Images from '../Image';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

// Component render img banner on home page and albumpage
function Banner({ item, index, data, isLivingAlbum, singleBtn }) {
    const [indexHover, setIndexHover] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const { slugDataBanner, isPlaying, songCurrent } = useSelector(
        combinedStatusSelector,
    );
    
    const isSlugCategory = slugDataBanner === item?.slug_category;
    const isSlugNameSinger = slugDataBanner === item?.slug_name_singer;
    const isSlugCategoryCurrent =
        songCurrent?.slug_category === item?.slug_category;
    const isSlugNameSingerCurrent =
        songCurrent?.slug_name_singer === item?.slug_name_singer;

    const isCategoryMatch =
        isSlugCategory && isSlugCategoryCurrent && isPlaying;
    const isSingerMatch =
        isSlugNameSinger && isSlugNameSingerCurrent && isPlaying;

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
            slugDataBanner !== songCurrent.slug_name_singer ||
            slugDataBanner !== songCurrent.slug_category
        ) {
            setIndexHover(null);
            setIsHover(false);
        }
    }, [songCurrent]);
    useEffect(() => {
        // set hover banner when play song in banner and not hover when not play song
        if (
            slugDataBanner === item?.slug_name_singer ||
            slugDataBanner === item?.slug_category
        ) {
            if (!isPlaying) {
                setIndexHover(null);
                setIsHover(false);
            }
        }
    }, [isPlaying]);
    return (
        <div
            className={cx(
                'item_card',
                indexHover === index && isHover ? 'isHover' : '',
            )}
            onMouseOver={handleHover}
            onMouseLeave={handleLeave}
        >
            <figure className={cx('item_img')}>
                <Images src={item?.src} />
            </figure>

            <div className={cx('item_action_hover')} onMouseOver={handleHover}>
                {indexHover === index && isHover && (
                    <ActionBtnAlbum
                        item={item}
                        isLivingAlbum={isLivingAlbum}
                        data={data}
                        singleBtn={singleBtn}
                        index={index}
                    />
                )}
            </div>
        </div>
    );
}

export default Banner;

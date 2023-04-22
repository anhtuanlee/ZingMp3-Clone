import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import Images from '../components/Image';
import { convertNumber } from '../hooks';
import { Random } from '../components/Icons';
import Loading from '../pages/Loading/Loading';
import Button from '../components/Button/Button';
import { getSingerDataApi } from '../services';
import styles from './RenderArtist.module.scss';
import { combinedStatusSelector } from '../redux/selector';
import { featureSlice, statusSlice } from '../redux/sliceReducer';

const cx = classNames.bind(styles);

const RenderArtist = ({ data, dataFull, isPageArtist, isPageAlbum }) => {
    const dispatch = useDispatch();
    const { isLoadingPage } = useSelector(combinedStatusSelector); 

    const handlePlayRandom = async (e, item) => {
        e.preventDefault();
        const dataListArtist = await getSingerDataApi(item.slug_name_singer).then(
            (data) => {
                if (data) {
                    const randomID = Math.floor(Math.random() * data.length);
                    dispatch(featureSlice.actions.setDataSongs(data));
                    dispatch(featureSlice.actions.setSongCurrent(randomID));
                    dispatch(featureSlice.actions.setCurrentID(randomID));
                    dispatch(statusSlice.actions.isPlayingChange(true));
                }
            },
        );
        return dataListArtist;
    };
    const dataClone = new Array(isPageArtist ? 12 : 6).fill();

    const dataMap = isLoadingPage ? dataClone : isPageAlbum ? data.slice(0, 5) : data; // page album just render 5 artist
    const result = dataMap.map((item, index) => {
        const Icon = item?.icon;
        const favorite = convertNumber(item?.favorite);

        const CardArtistLoading = () => {
            return (
                <div className={cx(isPageAlbum ? 'card_page_album' : 'card_page_artist')}>
                    <Loading
                        styles={{
                            width: '100%',
                            height: 0,
                            paddingBottom: '100%',
                            borderRadius: 999,
                        }}
                    />
                    <Loading
                        styles={{
                            width: '100%',
                        }}
                    />
                    <Loading
                        styles={{
                            margin: '0 auto',
                            width: '70%',
                        }}
                    />
                    <Loading
                        styles={{
                            margin: '0 auto',
                            width: '60%',
                            height: '30px',
                            borderRadius: '100px',
                        }}
                    />
                </div>
            );
        };

        return isLoadingPage ? (
            <CardArtistLoading key={index} />
        ) : (
            <div
                key={index}
                className={cx(isPageAlbum ? 'card_page_album' : 'card_page_artist')}
            >
                <Link
                    to={item?.image_music ? `/${item?.slug_name_singer}` : 'artist'}
                    state={
                        !item?.image_music && {
                            data: dataFull,
                        }
                    }
                >
                    <div className={cx('card_section')}>
                        {!item?.image_music ? (
                            <div className={cx('card_image')}>
                                <span className={cx('btn_arrow_right')}>
                                    <Icon />
                                </span>
                            </div>
                        ) : (
                            <figure className={cx('card_image')}>
                                <Images src={item?.image_music} />
                                {item?.image_music && !isPageArtist && !isPageAlbum && (
                                    <Button
                                        Icons={Random}
                                        onHandle={(e) => handlePlayRandom(e, item)}
                                        circle_hide
                                        className={cx('btn_random_card_artist')}
                                    />
                                )}

                                {isPageAlbum && (
                                    <Button
                                        Icons={Random}
                                        onHandle={(e) => handlePlayRandom(e, item)}
                                        border_nothover
                                        className={cx(
                                            'btn_random_card_artist_page_album',
                                        )}
                                    />
                                )}
                            </figure>
                        )}
                    </div>
                </Link>
                <Link
                    to={item?.image_music ? `/${item?.slug_name_singer}` : 'artist'}
                    state={
                        !item?.image_music && {
                            data: dataFull,
                        }
                    }
                >
                    <span className={cx('name_artist')}>{item?.name_singer}</span>
                </Link>

                {isPageArtist && (
                    <div className={cx('extra_title')}>
                        <span
                            className={cx('follow_user')}
                        >{`${favorite} quan tâm`}</span>
                        <Button
                            LeftIcons={Random}
                            onHandle={(e) => handlePlayRandom(e, item)}
                            text_border
                            className={cx('btn_random_card_artist')}
                        >
                            GÓC NHẠC
                        </Button>
                    </div>
                )}

                {isPageAlbum && (
                    <div className={cx('extra_title')}>
                        <span
                            className={cx('follow_user')}
                        >{`${favorite} quan tâm`}</span>
                    </div>
                )}
            </div>
        );
    });
    return result;
};
export default React.memo(RenderArtist);

RenderArtist.propTypes = {
    data: PropTypes.array,
    dataFull: PropTypes.array,
    isPageArtist: PropTypes.bool,
    isPageAlbum: PropTypes.bool,
};

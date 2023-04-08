import { useDispatch, useSelector } from 'react-redux';
import { combinedStatusSelector } from '../redux/selector';

import Button from '../components/Button';
import { Heart, HeartFull, More, Play } from '../components/Icons';
import WaveSong from '../components/Icons/WaveSong';
import { featureSlice, loginSlice, statusSlice } from '../redux/sliceReducer';
import styles from './PlayListSong.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

export const ActionBtnAlbum = ({
    item,
    isLivingAlbum,
    singleBtn,
    song,
    data,
    HomePageTrending,
    playlistSong,
    isListQueue,
}) => {
    const dispatch = useDispatch();
    const { slugDataBanner, dataSongs, isPlaying, songCurrent, dataUser } =
        useSelector(combinedStatusSelector); // slug_name in

    const isSlugCategory = slugDataBanner === item?.slug_banner_album_hot;
    const isSlugNameSinger = slugDataBanner === item?.slug_banner_singer_popular;

    const isSlugCategoryCurrent =
        songCurrent?.slug_category === item?.slug_banner_album_hot;
    const isSlugNameSingerCurrent =
        songCurrent?.slug_name_singer === item?.slug_banner_singer_popular;

    const [isFavorite, setIsFavorite] = useState(false);

    const handleLike = () => {
        if (playlistSong) {
            if (dataUser.listFavorite) {
                if (isFavorite) {
                    dispatch(loginSlice.actions.setFilterSongFavorite(song));
                    setIsFavorite(false);
                    dispatch(
                        featureSlice.actions.setNotification({
                            styles: 'success',
                            title: 'Đã xóa bài hát khỏi thư viện',
                        }),
                    );
                } else {
                    dispatch(loginSlice.actions.setListSongFavorite(song));
                    setIsFavorite(true); // update list song when handleChange like
                    dispatch(
                        featureSlice.actions.setNotification({
                            styles: 'success',
                            title: 'Đã thêm bài hát vào thư viện',
                        }),
                    );
                }
            } else {
                dispatch(loginSlice.actions.setIsLogin(true));
                setIsFavorite(false);
                dispatch(
                    featureSlice.actions.setNotification({
                        title: 'Vui lòng đăng nhập để sử dụng chức năng này',
                        styles: 'info',
                    }),
                );
            }
        }
    };

    const BUTTON_HOVER = [
        {
            extraTitle: isFavorite ? 'Xóa khỏi thư viện ' : 'Thêm vào thư viện',
            icon: isFavorite ? HeartFull : Heart,
            circle_hide: true,
            type: 'like',
        },
        {
            icon:
                (isSlugCategory && isSlugCategoryCurrent && isPlaying) ||
                (isSlugNameSinger && isSlugNameSingerCurrent && isPlaying)
                    ? WaveSong
                    : Play,
            border: true,
            border_nothover: true,
            type: 'play',
        },
        {
            extraTitle: 'Khác',
            icon: More,
            circle_hide: true,
            type: 'more',
        },
    ];
    const onHandle = (e, btn) => {
        if (
            (isSlugCategory && isSlugCategoryCurrent) ||
            (isSlugNameSinger && isSlugNameSingerCurrent)
        ) {
            // check itemcurrent and item saved in album

            e.preventDefault();
            switch (btn.type) {
                case 'play':
                    return dispatch(statusSlice.actions.isPlayingChange(!isPlaying));
                default:
                    console.log('default');
            }
        } else {
            switch (btn.type) {
                case 'play':
                    if (isLivingAlbum) {
                        const randomID = Math.floor(Math.random() * data?.length);
                        /*check action in home page  ? if true will update data new song , if false will request play and 
                        dispath data to album
                         */
                        if (data.length > 0) {
                            return (
                                dispatch(featureSlice.actions.setCurrentID(randomID)) &&
                                dispatch(
                                    featureSlice.actions.setSongCurrent(data[randomID]),
                                ) &&
                                dispatch(featureSlice.actions.setDataSongs(data)) &&
                                dispatch(statusSlice.actions.isPlayingChange(true))
                            );
                        }
                    } else {
                        return dispatch(statusSlice.actions.isRequirePlayChange(true));
                    }
                    break;
                case 'like':
                    e.preventDefault();
                    handleLike();
                    break; 
                default:
                    console.log('default');
            }
        }
    };

    const renderBtnHover = () => {
        const result = BUTTON_HOVER.map((btn, index) => {
            const shouldRenderButton = !singleBtn || btn.type === 'play';

            if (playlistSong) {
                if (HomePageTrending) {
                    // from home page
                    if (btn.type === 'more') {
                        return (
                            <div key={index}>
                                <Button
                                    Icons={btn.icon}
                                    extraTitle={btn.extraTitle}
                                    circle_hide={btn.circle_hide}
                                    border_nothover={btn.border_nothover}
                                    title={item?.title}
                                    onHandle={(e) => onHandle(e, btn)}
                                />
                            </div>
                        );
                    }
                } else if (btn.type === 'more' || btn.type === 'like') {
                    return (
                        <div key={index}>
                            <Button
                                active={isFavorite && btn.type === 'like'}
                                Icons={btn.icon}
                                extraTitle={btn.extraTitle}
                                circle_hide={btn.circle_hide}
                                border_nothover={btn.border_nothover}
                                title={item?.title}
                                onHandle={(e) => onHandle(e, btn)}
                                isListQueue={isListQueue}
                            />
                        </div>
                    );
                }
            } else {
                if (shouldRenderButton) {
                    // render full btn
                    return (
                        <div key={index}>
                            <Button
                                active={isFavorite && btn.type === 'like'}
                                Icons={btn.icon}
                                extraTitle={btn.extraTitle}
                                circle_hide={btn.circle_hide}
                                border_nothover={btn.border_nothover}
                                title={item?.title}
                                onHandle={(e) => onHandle(e, btn)}
                                className={cx('btn_action')}
                            />
                        </div>
                    );
                }
            }
            return null;
        });
        return result;
    };

    useEffect(() => {
        if (!dataUser.listFavorite || dataUser.listFavorite.length === 0) {
            // Nếu danh sách yêu thích rỗng thì không có bài hát nào trong danh sách yêu thích
            setIsFavorite(false);
            return;
        }
        // Kiểm tra xem bài hát có nằm trong danh sách yêu thích hay không
        const isSongFavorite = dataUser.listFavorite.some(
            (item) => item?._id === song?._id,
        );
        setIsFavorite(isSongFavorite);
    }, [dataUser.listFavorite, song]);

    useEffect(() => {
        localStorage.setItem('listFavoriteSong', JSON.stringify(dataUser.listFavorite));
    }, [dataUser.listFavorite]);

    return renderBtnHover();
};

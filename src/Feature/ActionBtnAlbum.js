import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Button from '../components/Button';
import styles from './PlayListSong.module.scss';
import Menu from '../layouts/components/Menu/Menu';
import WaveSong from '../components/Icons/WaveSong';
import { combindStatusRadio, combinedStatusSelector } from '../redux/selector';
import { Download, Heart, HeartFull, More, Play } from '../components/Icons';
import { featureSlice, loginSlice, radioSlice, statusSlice } from '../redux/sliceReducer';
import {
    createSongFavoriteUser,
    getSongFavorite,
    removeSongFavoriteUser,
} from '../services/userApi';

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
    sizeTablet,
    modalControls,
}) => {
    const dispatch = useDispatch();
    const { slugDataBanner, dataSongs, isPlaying, songCurrent, dataUser } =
        useSelector(combinedStatusSelector); // slug_name in
    const { isPlayingRadio } = useSelector(combindStatusRadio);

    const isSlugCategory = slugDataBanner === item?.slug_banner_album_hot;
    const isSlugNameSinger = slugDataBanner === item?.slug_banner_singer_popular;

    const isSlugCategoryCurrent =
        songCurrent?.slug_category === item?.slug_banner_album_hot;
    const isSlugNameSingerCurrent =
        songCurrent?.slug_name_singer === item?.slug_banner_singer_popular;

    const [isFavorite, setIsFavorite] = useState();
    const [isMore, setIsMore] = useState(false);
    const [callData, setCallData] = useState(false);
    //***handleEvent******/

    const addSongFavorite = async () => {
        const result = await createSongFavoriteUser(dataUser.accessToken, song._id);
        return result;
    };
    const removeSongFavorite = async () => {
        const result = await removeSongFavoriteUser(dataUser.accessToken, song._id);
        return result;
    };

    const handleLike = async () => {
        if (playlistSong) {
            if (dataUser.listFavorite && dataUser.accessToken) {
                if (isFavorite) {
                    await removeSongFavorite();
                    setIsFavorite(false);
                    toast.info('Đã xóa bài hát khỏi thư viện');
                } else {
                    await addSongFavorite();
                    setIsFavorite(true); // update list song when handleChange like
                    toast.info('Đã thêm bài hát vào thư viện');
                }
                setCallData(true);
            } else {
                dispatch(loginSlice.actions.setIsLogin(true));
                setIsFavorite(false);
                toast.info('Vui lòng đăng nhập để sử dụng chức năng này');
            }
        }
    };
    const handleSelectMoreSong = () => {
        setIsMore(true);
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
            (isSlugCategory && isSlugCategoryCurrent && !isPlayingRadio) ||
            (isSlugNameSinger && isSlugNameSingerCurrent && !isPlayingRadio)
        ) {
            // check itemcurrent and item saved in album

            e.preventDefault();
            switch (btn.type) {
                case 'play':
                    return (
                        dispatch(radioSlice.actions.setIsPlayingRadio(false)) &&
                        dispatch(statusSlice.actions.isPlayingChange(!isPlaying))
                    );
                case 'more':
                    e.stopPropagation();
                    handleSelectMoreSong();
                    break;
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
                    e.stopPropagation();
                    handleLike();
                    break;
                case 'more':
                    e.stopPropagation();
                    e.preventDefault();
                    handleSelectMoreSong();
                    break;
                default:
                    console.log('default');
            }
        }
    };
    const MENU_SELECT = [
        {
            title: 'Tải xuống',
            type: 'dowload',
            icon: Download,
        },
    ];
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
                                {isMore && (
                                    <Menu
                                        items={MENU_SELECT}
                                        visible={true}
                                        placement="top-start"
                                        song={song}
                                    />
                                )}
                            </div>
                        );
                    }
                } else if (sizeTablet) {
                    if (btn.type === 'like') {
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
                                />
                                {isMore && (
                                    <Menu
                                        items={MENU_SELECT}
                                        visible={true}
                                        placement="top-start"
                                        song={song}
                                    />
                                )}
                            </div>
                        );
                    }
                } else if (btn.type === 'more' || btn.type === 'like') {
                    return (
                        <div key={index} onMouseLeave={() => setIsMore(false)}>
                            <Button
                                active={isFavorite && btn.type === 'like'}
                                Icons={btn.icon}
                                modalControls={modalControls}
                                extraTitle={btn.extraTitle}
                                circle_hide={btn.circle_hide}
                                border_nothover={btn.border_nothover}
                                title={item?.title}
                                onHandle={(e) => onHandle(e, btn)}
                                isListQueue={isListQueue}
                            />
                            {isMore && btn.type === 'more' && (
                                <Menu
                                    items={MENU_SELECT}
                                    visible={true}
                                    placement="top-start"
                                    song={song}
                                    isListQueue={isListQueue}
                                />
                            )}
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
        if (
            !dataUser.listFavorite ||
            dataUser.listFavorite.length === 0 ||
            !dataUser.accessToken
        ) {
            // Nếu danh sách yêu thích rỗng thì không có bài hát nào trong danh sách yêu thích
            setIsFavorite(false);
            return;
        }
        // Kiểm tra xem bài hát có nằm trong danh sách yêu thích hay không
        const isSongFavorite = dataUser.listFavorite.some(
            (item) => item?._id === song?._id,
        );
        setIsFavorite(isSongFavorite);
    }, [dataUser.listFavorite.length, song, dataUser.accessToken]);

    useEffect(() => {
        //getDataSongFavorite of user
        if (callData) {
            const fetch = async () => {
                const result = await getSongFavorite(dataUser.accessToken);
                if (result.data) {
                    const dataMusic = result.data.map((song) => song.music);
                    dispatch(loginSlice.actions.setListSongFavorite(dataMusic));
                }
            };
            fetch();
        }
    }, [isFavorite, callData]);

    return renderBtnHover();
};

ActionBtnAlbum.propTypes = {
    item: PropTypes.object,
    isLivingAlbum: PropTypes.bool,
    singleBtn: PropTypes.bool,
    song: PropTypes.object,
    data: PropTypes.array,
    HomePageTrending: PropTypes.bool,
    playlistSong: PropTypes.bool,
    isListQueue: PropTypes.bool,
    sizeTablet: PropTypes.bool,
    modalControls: PropTypes.bool,
};

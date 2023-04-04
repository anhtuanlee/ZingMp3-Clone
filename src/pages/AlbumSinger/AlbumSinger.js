import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { combinedStatusSelector } from '../../redux/selector';

import { Banner } from '../../components/Banner';
import { ButtonEffectPlay } from '../../components/Button';
import { RenderFullListSong } from '../../Feature/HandleEvent/handleEvent';

import { useDate } from '../../hooks';
import { featureSlice, sidebarSlice, statusSlice } from '../../redux/sliceReducer';
import { getMusicTopView, getSingerDataApi } from '../../services';
import Loading from '../Loading';
import styles from './AlbumSinger.module.scss';
const cx = classNames.bind(styles);

function AlbumSinger() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ListSongRef = useRef();
    const location = useLocation();
    const { nickname } = useParams();
    const { isPlaying, songCurrent, slugDataBanner, isRequirePlay, isLoadingPage } =
        useSelector(combinedStatusSelector);

    const [dataFullSongs, setDataSinger] = useState([]);
    const [dataInAlbum, setDataInAlbum] = useState({});
    const timer = useDate(dataInAlbum?.createdAt);
    const slugNameSingerCurrent = songCurrent?.slug_name_singer;
    const slugCategoryCurrent = songCurrent?.slug_category;

    const slugNameSingerFromLocation = location?.state?.slug_name_singer;
    const slugCategoryFromLocation = location?.state?.slug_category;
    const isBannerAlbumHot = location?.state?.isBannerAlbumHot;

    const handlReqirePlayFromBanner = (data) => {
        if (isRequirePlay) {
            const randomID = Math.floor(Math.random() * data.length);

            dispatch(statusSlice.actions.isPlayingChange(true));
            dispatch(featureSlice.actions.setDataSongs(data));
            dispatch(featureSlice.actions.setSongCurrent(data[randomID]));
            dispatch(featureSlice.actions.setCurrentID(randomID));
            dispatch(statusSlice.actions.isRequirePlayChange(false));
        }
    };
    // banner singer popular
    useEffect(() => {
        if (!isBannerAlbumHot) {
            if (slugNameSingerCurrent === slugNameSingerFromLocation) {
                // check currentSong with slugname from location in content when click
                dispatch(featureSlice.actions.setSlugDataBanner(slugNameSingerCurrent));
            } else {
                dispatch(featureSlice.actions.setSlugDataBanner(undefined));
            }
        }
    }, [slugNameSingerCurrent, dispatch, slugNameSingerFromLocation, isBannerAlbumHot]);

    // banner album hot
    useEffect(() => {
        if (isBannerAlbumHot) {
            if (slugCategoryCurrent === slugCategoryFromLocation) {
                // check currentSong with slugname from location in content when click
                dispatch(featureSlice.actions.setSlugDataBanner(slugCategoryCurrent));
            } else {
                dispatch(featureSlice.actions.setSlugDataBanner(undefined));
            }
        }
    }, [slugCategoryCurrent, dispatch, isBannerAlbumHot, slugCategoryFromLocation]);
    // take data from slugNameLocation with params nickname
    useEffect(() => {
        if (dataFullSongs.length === 0 && !slugCategoryFromLocation) {
            dispatch(statusSlice.actions.isPageLoadingChange(true));
            const fetch = async () => {
                try {
                    const result = await getSingerDataApi(nickname).then((data) => {
                        setDataSinger(data);
                        setDataInAlbum(data[data.length - 1]);
                        handlReqirePlayFromBanner(data); // handle require play
                        dispatch(statusSlice.actions.isPageLoadingChange(false));
                    });
                    return result;
                } catch (error) {
                    if (error) {
                        navigate('..');
                    }
                }
            };
            fetch();
        }
    }, [nickname, dispatch, navigate]);

    //  take data and filter data from slugNameSingerFromLocation
    useEffect(() => {
        if (isBannerAlbumHot) {
            dispatch(statusSlice.actions.isPageLoadingChange(true));
            const fetchBannerAlbumHot = async () => {
                const result = await getMusicTopView(300).then((data) => {
                    const dataBannerAlbum = data.filter((item) => {
                        return item?.slug_category === slugCategoryFromLocation;
                    });
                    const newDataFillter = dataBannerAlbum.reverse().slice(0, 29);
                    setDataSinger(newDataFillter);
                    setDataInAlbum(newDataFillter[newDataFillter.length - 1]);
                    handlReqirePlayFromBanner(newDataFillter);
                    dispatch(statusSlice.actions.isPageLoadingChange(false));
                });
                return result;
            };
            fetchBannerAlbumHot();
        }
    }, [isBannerAlbumHot, slugCategoryFromLocation, dispatch]);

    // not active sidebar
    useEffect(() => {
        if (!location.state) {
            // if not state from location will return
            navigate('..');
        }
        dispatch(sidebarSlice.actions.setIdSidebarActive(null));
    }, [navigate, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container_playlist_detail')}>
                <div className={cx('title_section')}>
                    <Banner
                        item={location?.state}
                        data={dataFullSongs}
                        isLivingAlbum={true}
                        singleBtn={true}
                    />
                    {isLoadingPage || dataFullSongs.length === 0 ? (
                        <div
                            style={{
                                marginTop: 30,
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 20,
                            }}
                        >
                            <Loading styles={{ height: '4vh' }} />
                            <Loading styles={{ width: '60%', height: '3vh' }} />
                            <Loading styles={{ width: '40%', height: '2vh' }} />
                        </div>
                    ) : (
                        <h2 className={cx('title_header')}>
                            <span className={cx('title_header_section')}>
                                {location?.state?.title}
                            </span>
                            <span className={cx('time_update')}>
                                {dataInAlbum.name_singer} • {timer}
                            </span>
                            <ButtonEffectPlay
                                sizes="wider"
                                data={dataFullSongs}
                                isSlugNameFromLocation={slugDataBanner}
                            >
                                {!slugDataBanner
                                    ? 'PHÁT NGẪU NHIÊN'
                                    : isPlaying
                                    ? 'TẠM DỪNG'
                                    : 'TIẾP TỤC PHÁT'}
                            </ButtonEffectPlay>
                        </h2>
                    )}
                </div>

                <div className={cx('container_listsong_full')}>
                    {!isLoadingPage && (
                        <div className={cx('title_songs_list')}>
                            <span>BÀI HÁT</span>
                            <span>ALBUM</span>
                            <span>THỜI GIAN</span>
                        </div>
                    )}
                    <div className={cx('list_song')} ref={ListSongRef} id="container">
                        {RenderFullListSong(
                            dataFullSongs,
                            undefined,
                            undefined,
                            ListSongRef,
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumSinger;

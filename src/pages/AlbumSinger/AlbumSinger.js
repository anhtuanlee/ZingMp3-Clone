import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { combinedStatusSelector } from '../../redux/selector';

import { Banner } from '../../components/Banner';
import ButtonEffectPlay from '../../components/Button/config/ButtonEffectPlay';
import { RenderFullListSong } from '../../Feature/HandleEvent/handleEvent';

import { convertNumber, useDate } from '../../hooks';
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
    const slugNameSingerCurrent = songCurrent?.slug_name_singer; // song current
    const slugCategoryCurrent = songCurrent?.slug_category;

    const slugBannerSingerPopular = location?.state?.slug_banner_singer_popular;
    const slugBannerAlBumHot = location?.state?.slug_banner_album_hot;
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
            if (slugNameSingerCurrent === slugBannerSingerPopular) {
                // check currentSong with slugname from location in content when click
                dispatch(featureSlice.actions.setSlugDataBanner(slugNameSingerCurrent));
            } else {
                dispatch(featureSlice.actions.setSlugDataBanner(undefined));
            }
        }
    }, [slugNameSingerCurrent, dispatch, slugBannerSingerPopular, isBannerAlbumHot]);

    // banner album hot
    useEffect(() => {
        if (isBannerAlbumHot) {
            if (slugCategoryCurrent === slugBannerAlBumHot) {
                // check currentSong with slugname from location in content when click
                dispatch(featureSlice.actions.setSlugDataBanner(slugCategoryCurrent));
            } else {
                dispatch(featureSlice.actions.setSlugDataBanner(undefined));
            }
        }
    }, [slugCategoryCurrent, dispatch, isBannerAlbumHot, slugBannerAlBumHot]);
    // take data from slugNameLocation with params nickname
    useEffect(() => {
        if (dataFullSongs.length === 0 && !slugBannerAlBumHot) {
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

    //  take data and filter data from slugBannerSingerPopular
    useEffect(() => {
        if (isBannerAlbumHot) {
            dispatch(statusSlice.actions.isPageLoadingChange(true));
            const fetchBannerAlbumHot = async () => {
                const result = await getMusicTopView(300).then((data) => {
                    const dataBannerAlbum = data.filter((item) => {
                        return item?.slug_category === slugBannerAlBumHot;
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
    }, [isBannerAlbumHot, slugBannerAlBumHot, dispatch]);

    // not active sidebar
    useEffect(() => {
        if (!location.state) {
            // if not state from location will return
            navigate('..');
        }
        dispatch(sidebarSlice.actions.setIdSidebarActive(null));
    }, [navigate, dispatch]);

    const favorite = convertNumber(dataInAlbum.favorite);

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
                            <span className={cx('title_extra')}>
                                <Link to={`/${dataInAlbum.slug_name_singer}`}>
                                    <span className={cx('singer_outainding')}>
                                        {dataInAlbum.name_singer}
                                    </span>
                                </Link>
                                <span>Cập nhật • {timer}</span>
                                <span>{favorite} người yêu thích</span>
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
                        <RenderFullListSong
                            data={dataFullSongs}
                            containerRef={ListSongRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumSinger;

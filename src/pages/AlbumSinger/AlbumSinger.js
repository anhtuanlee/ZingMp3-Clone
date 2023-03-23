import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    activeSidebar,
    currentSong,
    dataSongs,
    playMusic,
    requirePlay,
    setCurrentID,
    slugNameCheck,
} from '../../redux/actions';
import {
    isPlayingSelector,
    isRequirePlaySelector,
    slugDataBannerSelector,
    songCurrentSelector,
} from '../../redux/selector';
import { Scroller } from 'react-scroll';

import { Banner } from '../../components/Banner';
import { ButtonEffectPlay } from '../../components/Button';
import { renderFullListSong } from '../../Feature/HandleEvent/handleEvent';

import { useDate } from '../../hooks';
import { getMusicTopView, getSingerDataApi } from '../../services';
import Loading from '../Loading';
import styles from './AlbumSinger.module.scss';
const cx = classNames.bind(styles);

function AlbumSinger() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { nickname } = useParams();
    const location = useLocation();
    const _isPlaying = useSelector(isPlayingSelector);
    const _songCurrent = useSelector(songCurrentSelector);
    const _slugDataBanner = useSelector(slugDataBannerSelector);
    const _isRequirePlay = useSelector(isRequirePlaySelector);

    const [dataFullSongs, setDataSinger] = useState([]);
    const [dataInAlbum, setDataInAlbum] = useState({});
    const timer = useDate(dataInAlbum?.createdAt);  
    const containerRef = useRef();
    const slugNameSingerCurrent = _songCurrent?.slug_name_singer;
    const slugCategoryCurrent = _songCurrent?.slug_category;

    const slugNameSingerFromLocation = location?.state?.slug_name_singer;
    const slugCategoryFromLocation = location?.state?.slug_category;
    const isBannerAlbumHot = location?.state?.isBannerAlbumHot;
    const handlReqirePlayFromBanner = (data) => {
        if (_isRequirePlay) {
            const randomID = Math.floor(Math.random() * data.length);
            dispatch(playMusic(true));
            dispatch(dataSongs(data));
            dispatch(currentSong(data[randomID]));
            dispatch(setCurrentID(randomID));
            dispatch(requirePlay(false));
        }
    }; 
    // banner singer popular
    useEffect(() => {
        if (!isBannerAlbumHot) {
            if (slugNameSingerCurrent === slugNameSingerFromLocation) {
                // check currentSong with slugname from location in content when click
                dispatch(slugNameCheck(slugNameSingerCurrent));
            } else {
                dispatch(slugNameCheck(undefined));
            }
        }
    }, [slugNameSingerCurrent]);

    // banner album hot
    useEffect(() => {
        if (isBannerAlbumHot) {
            if (slugCategoryCurrent === slugCategoryFromLocation) {
                // check currentSong with slugname from location in content when click
                dispatch(slugNameCheck(slugCategoryCurrent));
            } else {
                dispatch(slugNameCheck(undefined));
            }
        }
    }, [slugCategoryCurrent]);

    // take data from slugNameLocation with params nickname
    useEffect(() => {
        if (dataFullSongs.length === 0 && !slugCategoryFromLocation) {
            const fetch = async () => {
                try {
                    const result = await getSingerDataApi(nickname).then(
                        (data) => {
                            setDataSinger(data);
                            setDataInAlbum(data[data.length - 1]);
                            handlReqirePlayFromBanner(data); // handle require play
                        },
                    );
                    return result;
                } catch (error) {
                    if (error) {
                        navigate('..');
                    }
                }
            };
            fetch();
        }
    }, [nickname]);

    //  take data and filter data from slugNameSingerFromLocation
    useEffect(() => {
        if (isBannerAlbumHot) {
            const fetchBannerAlbumHot = async () => {
                const result = await getMusicTopView(300).then((data) => {
                    const dataBannerAlbum = data.filter((item) => {
                        return item?.slug_category === slugCategoryFromLocation;
                    });
                    const newDataFillter = dataBannerAlbum
                        .reverse()
                        .slice(0, 29);
                    console.log(newDataFillter)
                    setDataSinger(newDataFillter);
                    setDataInAlbum(newDataFillter[newDataFillter.length - 1]);
                    handlReqirePlayFromBanner(newDataFillter);
                });
                return result;
            };
            fetchBannerAlbumHot();
        }
    }, [isBannerAlbumHot, slugCategoryFromLocation]);

    // not active sidebar
    useEffect(() => {
        if (!location.state) {
            // if not state from location will return
            navigate('..');
        }
        dispatch(activeSidebar(null));
        window.scrollTo(0,0) 
    }, []);

    return dataFullSongs.length === 0 ? (
        <div className={cx('loading')}>
            <Loading />
        </div>
    ) : (
        <div className={cx('wrapper')}>
            <div className={cx('container_playlist_detail')}>
                <div className={cx('title_section')}>
                    <Banner
                        item={location?.state}
                        data={dataFullSongs}
                        isLivingAlbum={true}
                        singleBtn={true}
                    />
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
                            isSlugNameFromLocation={_slugDataBanner}
                        >
                            {!_slugDataBanner
                                ? 'PHÁT NGẪU NHIÊN'
                                : _isPlaying
                                ? 'TẠM DỪNG'
                                : 'TIẾP TỤC PHÁT'}
                        </ButtonEffectPlay>
                    </h2>
                </div>

                <div className={cx('container_listsong_full')}>
                    <div className={cx('title_songs_list')}>
                        <span>BÀI HÁT</span>
                        <span>ALBUM</span>
                        <span>THỜI GIAN</span>
                    </div>
                    <div className={cx('list_song')} ref={containerRef} id='container'>
                        {renderFullListSong(
                            dataFullSongs,
                            undefined,
                            undefined,
                            containerRef,
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumSinger;

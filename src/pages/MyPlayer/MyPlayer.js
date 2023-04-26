import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    featureSlice,
    loginSlice,
    sidebarSlice,
    statusSlice,
} from '../../redux/sliceReducer';
import styles from './MyPlayer.module.scss';
import { ArrowRight } from '../../components/Icons';
import RenderArtist from '../../Feature/RenderArtist';
import { combinedStatusSelector } from '../../redux/selector';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';
import { getProfileUser, getSongFavorite } from '../../services/userApi';
import { RenderFullListSong } from '../../Feature/HandleEvent/handleEvent';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function MyPlayer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataUser, isLoadingPage } = useSelector(combinedStatusSelector);

    const listArtist = dataUser?.listFavorite.filter((item, index, arr) => {
        // filter list artist
        const newList = arr.findIndex(
            (it) => it.slug_name_singer === item.slug_name_singer,
        );
        return newList === index;
    });
    const filteredFavoriteArtists = [
        ...listArtist.slice(0, 4),
        { image_music: null, name_singer: 'Xem tất cả', icon: ArrowRight },
    ];
    useEffect(() => {
        // fake loadingpage to take data user from profile
        if (dataUser.accessToken) {
            dispatch(statusSlice.actions.isPageLoadingChange(true));
            const fetch = async () => {
                await getProfileUser(dataUser.accessToken);
                dispatch(statusSlice.actions.isPageLoadingChange(false));
            };
            fetch();
            dispatch(sidebarSlice.actions.setIdSidebarActive(0));
        } else {
            navigate('..');
            dispatch(sidebarSlice.actions.setIdSidebarActive(1)); 
            dispatch(loginSlice.actions.setIsLogin(true)); 
            toast.info('Vui lòng đăng nhập để sử dụng chức năng này!');
        }
    }, []);

    useEffect(() => {
        //getDataSongFavorite of user
        const fetch = async () => {
            const result = await getSongFavorite(dataUser.accessToken);
            const dataMusic = result.data.map((song) => song.music);
            dispatch(loginSlice.actions.setListSongFavorite(dataMusic));

            return result;
        };
        fetch();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title_section')}>
                    <TitlePage
                        title="Thư Viện"
                        sizes="medium"
                        data={dataUser?.listFavorite}
                    />
                </div>
                <>
                    <div>
                        <TitlePage styles={{ fontSize: '25px' }} title="Nghệ Sĩ" />

                        <div className={cx('container_card_artist')}>
                            <RenderArtist
                                data={filteredFavoriteArtists}
                                dataFull={listArtist}
                            />
                        </div>
                    </div>
                    <div className={cx('playlist_favorite')}>
                        <TitlePage styles={{ fontSize: '25px' }} title="Playlist" />
                        {!isLoadingPage && dataUser.listFavorite.length > 0 && (
                            <div className={cx('title_songs_list')}>
                                <span>BÀI HÁT</span>
                                <span>ALBUM</span>
                                <span>THỜI GIAN</span>
                            </div>
                        )}
                        {!dataUser.listFavorite.length && !isLoadingPage > 0 && (
                            <h3>Hiện chưa có bài hát nào.... </h3>
                        )}
                        <RenderFullListSong data={dataUser?.listFavorite} />
                    </div>
                </>
            </div>
        </div>
    );
}

export default MyPlayer;

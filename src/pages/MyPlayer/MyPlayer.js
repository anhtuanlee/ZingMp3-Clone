import classNames from 'classnames/bind';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RenderFullListSong } from '../../Feature/HandleEvent/handleEvent';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';
import { combinedStatusSelector } from '../../redux/selector';
import {
    featureSlice,
    loginSlice,
    sidebarSlice,
    statusSlice,
} from '../../redux/sliceReducer';
import { getProfileUser } from '../../services/userApi';
import styles from './MyPlayer.module.scss';
import Images from '../../components/Image';
import { ArrowRight, Next, Random } from '../../components/Icons';
import Button from '../../components/Button/Button';
import { getSingerDataApi } from '../../services';
import RenderArtist from '../../Feature/RenderArtist';

const cx = classNames.bind(styles);

function MyPlayer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataUser, isLoadingPage } = useSelector(combinedStatusSelector);
    const listFavorite = useMemo(() => {
        return dataUser.listFavorite;
    }, [dataUser.listFavorite]);

    const listArtist = listFavorite.filter((item, index, arr) => {
        // filter list artist
        const newList = arr.findIndex(
            (it) => it.slug_name_singer === item.slug_name_singer,
        );
        return newList === index;
    });
    const filteredFavoriteArtists = [
        ...listArtist.slice(0, 5),
        { image_music: null, name_singer: 'Xem tất cả', icon: ArrowRight },
    ];
    useEffect(() => {
        // fake loadingpage to take data user from profile
        if (dataUser.accessToken) {
            dispatch(statusSlice.actions.isPageLoadingChange(true));
            const fetch = async () => {
                const result = await getProfileUser(dataUser.accessToken).then((data) => {
                    dispatch(statusSlice.actions.isPageLoadingChange(false));
                });

                return result;
            };
            fetch();
            dispatch(sidebarSlice.actions.setIdSidebarActive(0));
        } else {
            navigate('..');
            dispatch(sidebarSlice.actions.setIdSidebarActive(1));

            dispatch(loginSlice.actions.setIsLogin(true));
            dispatch(
                featureSlice.actions.setNotification({
                    title: 'Vui lòng đăng nhập để sử dụng chức năng này!',
                    styles: 'info',
                }),
            );
        }
    }, []);
    // save user id to check after login . if same will use listFavorite old, and change [] when new user id
    useEffect(() => {
        if (dataUser.data._id) {
            localStorage.setItem('dataUserID', JSON.stringify(dataUser.data._id));
        }
    }, [dataUser.data.length]);

    return (
        dataUser.data.image && (
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title_section')}>
                        <TitlePage
                            title={`Thư Viện của ${dataUser?.data.user_name}`}
                            sizes="medium"
                            data={listFavorite}
                        />
                    </div>
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
                        {!isLoadingPage && (
                            <div className={cx('title_songs_list')}>
                                <span>BÀI HÁT</span>
                                <span>ALBUM</span>
                                <span>THỜI GIAN</span>
                            </div>
                        )}
                        <RenderFullListSong data={listFavorite} />
                    </div>
                </div>
            </div>
        )
    );
}

export default MyPlayer;

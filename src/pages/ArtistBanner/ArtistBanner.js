import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    featureSlice,
    loginSlice,
    sidebarSlice,
    statusSlice,
} from '../../redux/sliceReducer';
import styles from './ArtistBanner.module.scss';
import RenderArtist from '../../Feature/RenderArtist';
import { getProfileUser } from '../../services/userApi';
import { combinedStatusSelector } from '../../redux/selector';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';

const cx = classNames.bind(styles);
function ArtistBanner() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const dataFullArtist = location.state.data;
    const { dataUser } = useSelector(combinedStatusSelector);

    useEffect(() => {
        // fake loadingpage to take data user from profile
        if (dataUser.accessToken) {
            dispatch(statusSlice.actions.isPageLoadingChange(true));
            const fetch = async () => {
                const result = await getProfileUser(dataUser.accessToken).then((data) => {
                    if (data) {
                        dispatch(statusSlice.actions.isPageLoadingChange(false));
                    }
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('nav')}>
                    <TitlePage title="Nghệ Sĩ" />
                </div>
                <div className={cx('list_card_artist')}>
                    <RenderArtist data={dataFullArtist} isPageArtist />
                </div>
                {!dataUser.listFavorite.length > 0 && (
                    <h3>Hiện chưa có nghệ sĩ nào.... </h3>
                )}
            </div>
        </div>
    );
}

export default ArtistBanner;

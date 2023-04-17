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
    const location = useLocation();
    const dataFullArtist = location.state.data;
    const { dataUser } = useSelector(combinedStatusSelector);

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

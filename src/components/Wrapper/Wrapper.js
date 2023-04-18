import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import ListQueue from '../ListQueue/';
import styles from './Wrapper.module.scss';
import MvPlayer from '../MvPlayer/MvPlayer';
import ModalTheme from '../ModalTheme/ModalTheme';
import { loginSlice } from '../../redux/sliceReducer';
import { getProfileUser } from '../../services/userApi';
import Notification from '../Notification/Notification';
import { combinedStatusSelector } from '../../redux/selector';

const cx = classNames.bind(styles);
function Wrapper({ children }) {
    const dispatch = useDispatch();

    const {
        isTheme,
        isMvPlayer,
        isPlayerQueue,
        isLogin,
        notification,
        themeSelect,
        dataUser,
    } = useSelector(combinedStatusSelector);

    const [isNotification, setIsNotifiCation] = useState();

    const delayNotification = notification.title && isNotification;

    useEffect(() => {
        if (themeSelect.title) {
            document.documentElement.style.setProperty(
                '--purple-primary',
                themeSelect.properties?.purplePrimary,
            );
            document.documentElement.style.setProperty(
                '--primary',
                themeSelect.properties?.layoutBg ?? 'trenparent',
            );

            document.documentElement.style.setProperty(
                '--sidebar-bg',
                themeSelect.properties?.sidebarBg ?? 'rgba(0,0,0,0.25)',
            );
            document.documentElement.style.setProperty(
                '--text-primary',
                themeSelect.properties?.textPrimary,
            );
            document.documentElement.style.setProperty(
                '--text-secondary',
                themeSelect.properties?.textSecondary,
            );

            document.documentElement.style.setProperty(
                '--layout-header-bg',
                themeSelect.properties?.layoutHeaderBg,
            );
            document.documentElement.style.setProperty(
                '--primary-bg',
                themeSelect.properties?.primaryBg,
            );
            document.documentElement.style.setProperty(
                '--player-bg',
                themeSelect.properties?.playerBg,
            );
            document.documentElement.style.setProperty(
                '--background-section',
                `url(${themeSelect.properties?.backgroundImg})`,
            );
            document.documentElement.style.setProperty(
                '--background-section-size',
                themeSelect?.properties?.backgrondSize ?? '1920px auto',
            );
            document.documentElement.style.setProperty(
                '--newsonglayout-bg',
                themeSelect?.properties?.newSongLayout,
            );
            document.documentElement.style.setProperty(
                '--link-text-hover',
                themeSelect?.properties?.textHover,
            );
            document.documentElement.style.setProperty(
                '--border-player',
                themeSelect?.properties?.borderPlayer,
            );
        }
    }, []);
    useEffect(() => {
        setIsNotifiCation(true);
        const timer = setTimeout(() => {
            setIsNotifiCation(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [notification]);

    useEffect(() => {
        if (dataUser.accessToken) {
            const fetch = async () => {
                const result = await getProfileUser(dataUser.accessToken).then((data) => {
                    dispatch(loginSlice.actions.setAccessToken(data.accessToken));
                    dispatch(loginSlice.actions.setDataUser(data.data));
                    dispatch(loginSlice.actions.setIsLogin(false));
                });
                return result;
            };
            fetch();
        }
        localStorage.setItem('accessToken', JSON.stringify(dataUser.accessToken));
    }, [dataUser.accessToken, dispatch]);

    return (
        <div className={cx('wrapper')}>
            {children}
            {delayNotification && (
                <Notification title={notification.title} styles={notification.styles} />
            )}
            {isTheme && <ModalTheme />}
            {isMvPlayer && <MvPlayer />}
            {isPlayerQueue && <ListQueue />}
            {isLogin && <Form />}
        </div>
    );
}

export default Wrapper;

Wrapper.propType = {
    children: PropTypes.node,
};

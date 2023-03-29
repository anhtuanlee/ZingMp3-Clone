import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../redux/selector';
import ModalTheme from '../ModalTheme/ModalTheme';
import MvPlayer from '../MvPlayer/MvPlayer';
import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);
function Wrapper({ children }) {
    const { themeSelect, isTheme, isMvPlayer } = useSelector(combinedStatusSelector);

    useEffect(() => {
        if (themeSelect.title) {
            document.documentElement.style.setProperty(
                '--purple-primary',
                themeSelect.properties.purplePrimary,
            );
            document.documentElement.style.setProperty(
                '--primary',
                themeSelect.properties.layoutBg ?? 'trenparent',
            );

            document.documentElement.style.setProperty(
                '--sidebar-bg',
                themeSelect.properties.sidebarBg ?? 'rgba(0,0,0,0.25)',
            );
            document.documentElement.style.setProperty(
                '--text-primary',
                themeSelect.properties.textPrimary,
            );
            document.documentElement.style.setProperty(
                '--text-secondary',
                themeSelect.properties.textSecondary,
            );

            document.documentElement.style.setProperty(
                '--layout-header-bg',
                themeSelect.properties.layoutHeaderBg,
            );
            document.documentElement.style.setProperty(
                '--primary-bg',
                themeSelect.properties.primaryBg,
            );
            document.documentElement.style.setProperty(
                '--player-bg',
                themeSelect.properties.playerBg,
            );
            document.documentElement.style.setProperty(
                '--background-section',
                `url(${themeSelect.properties.backgroundImg})`,
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
                themeSelect?.properties.textHover,
            );
            document.documentElement.style.setProperty(
                '--border-player',
                themeSelect?.properties.borderPlayer,
            );
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            {children}
            {isTheme && <ModalTheme />}
            {isMvPlayer && <MvPlayer />}
        </div>
    );
}

export default Wrapper;

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Images from '../Image';
import Button from '../../components/Button';
import styles from './ModalTheme.module.scss';
import { themeSlice } from '../../redux/sliceReducer';
import { combinedStatusSelector } from '../../redux/selector';

const cx = classNames.bind(styles);

function ModalItem({ item, themeTest }) {
    const dispatch = useDispatch();
    const { themeSelect } = useSelector(combinedStatusSelector);

    const [isHoverCard, setIsHoverCard] = useState(false);
    const [themeCurrent, setThemeCurrent] = useState({});

    const handleHover = () => {
        setIsHoverCard(true);
    };

    const handleLeave = () => {
        setIsHoverCard(false);
    };

    const handleActiveTheme = async () => {
        // wait change theme on store after update theme current
        dispatch(themeSlice.actions.setTheme(item));
        await new Promise((res) => setTimeout(res, 0));
        setThemeCurrent({});
    };
    const handleTestTheme = async () => {
        if (item?.title !== themeCurrent?.title) {
            setThemeCurrent(item);
        } else {
            setThemeCurrent({});
            await new Promise((resolve) => setTimeout(resolve, 0));
            setThemeCurrent(item);
        }
    };

    useEffect(() => {
        if (!themeTest && themeCurrent?.title !== undefined) {
            document.documentElement.style.setProperty(
                '--purple-primary',
                themeCurrent?.properties?.purplePrimary,
            );
            document.documentElement.style.setProperty(
                '--primary',
                themeCurrent?.properties?.layoutBg ?? 'trenparent',
            );

            document.documentElement.style.setProperty(
                '--sidebar-bg',
                themeCurrent?.properties?.sidebarBg ?? 'rgba(0,0,0,0.25)',
            );
            document.documentElement.style.setProperty(
                '--text-primary',
                themeCurrent?.properties?.textPrimary,
            );
            document.documentElement.style.setProperty(
                '--text-secondary',
                themeCurrent?.properties?.textSecondary,
            );

            document.documentElement.style.setProperty(
                '--layout-header-bg',
                themeCurrent?.properties?.layoutHeaderBg,
            );
            document.documentElement.style.setProperty(
                '--primary-bg',
                themeCurrent?.properties?.primaryBg,
            );
            document.documentElement.style.setProperty(
                '--player-bg',
                themeCurrent?.properties?.playerBg,
            );
            document.documentElement.style.setProperty(
                '--background-section',
                `url(${themeCurrent?.properties?.backgroundImg})`,
            );
            document.documentElement.style.setProperty(
                '--link-text-hover',
                themeCurrent?.properties?.textHover,
            );
            document.documentElement.style.setProperty(
                '--newsonglayout-bg',
                themeCurrent?.properties?.newSongLayout,
            );
            document.documentElement.style.setProperty(
                '--border-player',
                themeCurrent?.properties?.borderPlayer,
            );
            document.documentElement.style.setProperty(
                '--background-section-size',
                themeCurrent?.properties?.backgrondSize ?? '1920px auto',
            );
            document.documentElement.style.setProperty(
                '--sidebar-popup-bg',
                themeCurrent?.properties?.sidebarPoup,
            );
        } else {
            if (themeSelect.title) {
                document.documentElement.style.setProperty(
                    '--purple-primary',
                    themeSelect?.properties?.purplePrimary,
                );
                document.documentElement.style.setProperty(
                    '--primary',
                    themeSelect?.properties?.layoutBg ?? 'trenparent',
                );

                document.documentElement.style.setProperty(
                    '--sidebar-bg',
                    themeSelect?.properties?.sidebarBg ?? 'rgba(0,0,0,0.25)',
                );
                document.documentElement.style.setProperty(
                    '--text-primary',
                    themeSelect?.properties?.textPrimary,
                );
                document.documentElement.style.setProperty(
                    '--text-secondary',
                    themeSelect?.properties?.textSecondary,
                );

                document.documentElement.style.setProperty(
                    '--layout-header-bg',
                    themeSelect?.properties?.layoutHeaderBg,
                );
                document.documentElement.style.setProperty(
                    '--primary-bg',
                    themeSelect?.properties?.primaryBg,
                );
                document.documentElement.style.setProperty(
                    '--player-bg',
                    themeSelect?.properties?.playerBg,
                );
                document.documentElement.style.setProperty(
                    '--background-section',
                    `url(${themeSelect?.properties?.backgroundImg})`,
                );
                document.documentElement.style.setProperty(
                    '--link-text-hover',
                    themeSelect?.properties?.textHover,
                );
                document.documentElement.style.setProperty(
                    '--newsonglayout-bg',
                    themeSelect?.properties?.newSongLayout,
                );
                document.documentElement.style.setProperty(
                    '--border-player',
                    themeSelect?.properties?.borderPlayer,
                );
                document.documentElement.style.setProperty(
                    '--background-section-size',
                    themeSelect?.properties?.backgrondSize ?? '1920px auto',
                );
                document.documentElement.style.setProperty(
                    '--sidebar-popup-bg',
                    themeSelect?.properties?.sidebarPoup,
                );
            }
        }

        localStorage.setItem('themeRecent', JSON.stringify(themeSelect));
    }, [themeCurrent, dispatch, themeTest, themeSelect]);

    return (
        <div
            className={cx('item_theme')}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <figure
                className={cx(
                    'item_card_img',
                    item.title === themeSelect.title ? 'themeActive' : '',
                )}
            >
                <Images src={item?.cardArtist} />
                {isHoverCard && (
                    <div className={cx('item_card_hover')}>
                        <Button
                            sizes="min"
                            primary
                            className={cx('btn_card_theme_primary')}
                            onHandle={handleActiveTheme}
                        >
                            ÁP DỤNG
                        </Button>
                        <Button
                            sizes="min"
                            text_border
                            className={cx('btn_card_theme_border')}
                            onHandle={handleTestTheme}
                        >
                            XEM TRƯỚC
                        </Button>
                    </div>
                )}
            </figure>
            <span className={cx('item_title')}>{item.title}</span>
        </div>
    );
}

export default ModalItem;

ModalItem.propTypes = {
    item: PropTypes.object,
    themeTest: PropTypes.bool,
};

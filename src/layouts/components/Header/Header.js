import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { ButtonTheme, DowloadIcon, IconsVIP, Setting } from '../../../components/Icons';

import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import Images from '../../../components/Image';
import Search from '../../../components/Search';
import { MENU_SETTING_HEADER, MENU_USER_HEADER } from '../../../redux/constant';
import Menu from '../Menu';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { themeSlice } from '../../../redux/sliceReducer';
import { combinedStatusSelector } from '../../../redux/selector';

const cx = classNames.bind(styles);

function Header({ styles }) {
    const dispatch = useDispatch();
    const [scrollY, setScrollY] = useState(0);
    const { isTheme } = useSelector(combinedStatusSelector);

    // handleChangeTheme
    const onChangeTheme = () => {
        dispatch(themeSlice.actions.setIsModalTheme(!isTheme));
    };

    useEffect(() => {
        // handle Scroll Header
        const handleScroll = () => setScrollY(window.scrollY);

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cx('wrapper', styles, scrollY > 133 ? 'isScroll' : '')}>
            <div className={cx('inner')}>
                <div className={cx('button_controls_left')}>
                    <div>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={cx('icon-arrow-prev')}
                        />
                    </div>
                    <div>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={cx('icon-arrow-next')}
                        />
                    </div>
                    <Search />
                </div>
                <div className={cx('button_controls_right')}>
                    <Button primary LeftIcons={DowloadIcon} sizes="normal">
                        Dowload
                    </Button>
                    <Button
                        circle
                        Icons={ButtonTheme}
                        extraTitle={'Chủ đề'}
                        onHandle={onChangeTheme}
                    />

                    <Button circle Icons={IconsVIP} extraTitle={'Nâng cấp VIP'} />

                    <Menu items={MENU_SETTING_HEADER}>
                        <Button circle Icons={Setting} extraTitle={'Cài đặt'} />
                    </Menu>

                    <Menu items={MENU_USER_HEADER} visible={false}>
                        <Images
                            className={cx('avatar')}
                            src="https://2.bp.blogspot.com/-gnXUMwRHkaI/WE1VCAktNhI/AAAAAAAAjfs/CZk6jUipKXgvOKc821Rnz-fwXT0QhLEuACEw/s1600/15085502_591915637681021_5420424684372040797_n.jpg"
                        />
                    </Menu>
                </div>
            </div>
        </header>
    );
}
Header.propTypes = {
    styles: PropTypes.string,
};
export default React.memo(Header);

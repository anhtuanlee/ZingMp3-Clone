import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { ButtonTheme, DowloadIcon, IconsVIP, Setting } from '../../../components/Icons';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import Images from '../../../components/Image';
import Search from '../../../components/Search';
import { MENU_SETTING_HEADER, MENU_USER_HEADER } from '../../../redux/constant';
import { combinedStatusSelector } from '../../../redux/selector';
import { loginSlice, themeSlice } from '../../../redux/sliceReducer';
import Menu from '../Menu';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ styles, isScrollHeader }) {
    const dispatch = useDispatch();
    const { isTheme, dataUser } = useSelector(combinedStatusSelector);

    // handleChangeTheme
    const onChangeTheme = () => {
        dispatch(themeSlice.actions.setIsModalTheme(!isTheme));
    };
    const handleLogin = () => {
        dispatch(loginSlice.actions.setIsLogin(true));
    };  
    return (
        <header className={cx('wrapper', styles, isScrollHeader > 133 ? 'isScroll' : '')}>
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

                    {dataUser.accessToken ? (
                        <Menu items={MENU_USER_HEADER} visible={false}>
                            <Images className={cx('avatar')} src={dataUser.data.image} />
                        </Menu>
                    ) : (
                        <Button purplePrimary onHandle={handleLogin}>
                            Đăng Nhập
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
Header.propTypes = {
    styles: PropTypes.string,
};
export default React.memo(Header);

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../../components/Button/Button';
import {
    ArrowLeft,
    ArrowRight,
    BarSort,
    ButtonTheme,
    Close,
    DowloadIcon,
    IconsVIP,
    SearchMobile,
    Setting,
} from '../../../components/Icons';
import Images from '../../../components/Image';
import Search from '../../../components/Search';
import { MENU_SETTING_HEADER, MENU_USER_HEADER } from '../../../redux/constant';
import { combinedStatusSelector } from '../../../redux/selector';
import {
    loginSlice,
    statusSlice,
    themeSlice
} from '../../../redux/sliceReducer';
import Menu from '../Menu';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ styles, isScrollHeader }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnSearchRef = useRef();
    const { isTheme, dataUser, isSidebarMobile } = useSelector(combinedStatusSelector);
    const [searchForm, setSearchForm] = useState(false);
    const [animation, setAnimation] = useState('on');

    const hostsIdx = window.history.state.idx;
    const hostLength = window.history.length;
    // handleChangeTheme
    const onChangeTheme = () => {
        dispatch(themeSlice.actions.setIsModalTheme(!isTheme));
    };
    const handleLogin = () => {
        dispatch(loginSlice.actions.setIsLogin(true));
    };

    const handleSearchForm = async (e) => {
        //  set animation delay
        e.stopPropagation();
        setAnimation('off');
        await new Promise((resolve) => {
            setTimeout(resolve, searchForm && 300);
        });

        setSearchForm(!searchForm);
        setAnimation('on');
    };

    const handleTurnOffSearchForm = async (e) => {
        //turnoff exclude btnSearch and set animation delay
        e.stopPropagation();
        setAnimation('off');
        await new Promise((resolve) => {
            setTimeout(resolve, searchForm && 300);
        });
        if (!e.target.contains(btnSearchRef.current)) {
            setSearchForm(false);
        }
        setAnimation('on');
    };
    const handleSidbar = () => {
        dispatch(statusSlice.actions.isSidebarMobile(!isSidebarMobile));
    };

    return (
        <Media query="(max-width: 600px)">
            {(matches) => {
                return matches ? (
                    // Mobile
                    <header
                        className={cx(
                            'wrapper',
                            styles,
                            isScrollHeader > 133 ? 'isScroll' : '',
                        )}
                    >
                        <div
                            className={cx('inner')}
                            onClick={(e) => handleTurnOffSearchForm(e)}
                        >
                            <span className={cx('btn_barsort')} onClick={handleSidbar}>
                                <BarSort />
                            </span>
                            <Link to="/" className={cx('logo')}></Link>

                            <div className={cx('button_controls_right')}>
                                <span
                                    ref={btnSearchRef}
                                    className={cx('btn_search_header_mobile')}
                                    onClick={handleSearchForm}
                                >
                                    {!searchForm ? <SearchMobile /> : <Close />}
                                </span>
                                <div className={cx('btn_theme')}>
                                    <Button
                                        circle
                                        Icons={ButtonTheme}
                                        extraTitle={'Chủ đề'}
                                        onHandle={onChangeTheme}
                                    />
                                </div>
                            </div>
                        </div>
                        {searchForm && (
                            <div
                                className={cx('button_controls_left', animation)}
                                ref={btnSearchRef}
                            >
                                <div className={cx('search_form')}>
                                    <Search
                                        visibleHeaderMobile={true}
                                        handleSearchForm={(e) => handleSearchForm(e)}
                                    />
                                    {/* send request open search form */}
                                </div>
                            </div>
                        )}
                    </header>
                ) : (
                    //tablet and desktop
                    <header
                        className={cx(
                            'wrapper',
                            styles,
                            isScrollHeader > 133 ? 'isScroll' : '',
                        )}
                    >
                        <div className={cx('inner')}>
                            <div className={cx('button_controls_left')}>
                                <span
                                    className={cx(
                                        'icon-arrow-prev',
                                        hostsIdx === 0 && 'disabled',
                                    )}
                                    onClick={() => hostsIdx > 0 && navigate(-1)}
                                >
                                    <ArrowLeft />
                                </span>
                                <span
                                    className={cx(
                                        'icon-arrow-next',
                                        hostsIdx === hostLength - 2 && 'disabled',
                                    )}
                                    onClick={() => navigate(1)}
                                >
                                    <ArrowRight />
                                </span>
                                <div className={cx('search_form')}>
                                    <Search />
                                </div>
                            </div>
                            <div className={cx('button_controls_right')}>
                                <Button
                                    className={cx('btn_download')}
                                    primary
                                    LeftIcons={DowloadIcon}
                                    sizes="normal"
                                >
                                    Dowload
                                </Button>
                                <Button
                                    circle
                                    Icons={ButtonTheme}
                                    extraTitle={'Chủ đề'}
                                    onHandle={onChangeTheme}
                                />

                                <Button
                                    circle
                                    Icons={IconsVIP}
                                    extraTitle={'Nâng cấp VIP'}
                                />

                                <Menu items={MENU_SETTING_HEADER}>
                                    <Button
                                        circle
                                        Icons={Setting}
                                        extraTitle={'Cài đặt'}
                                    />
                                </Menu>

                                {dataUser.accessToken ? (
                                    <Menu items={MENU_USER_HEADER} visible={false}>
                                        <Images
                                            className={cx('avatar')}
                                            src={dataUser.data.image}
                                        />
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
            }}
        </Media>
    );
}

export default React.memo(Header);

Header.propTypes = {
    styles: PropTypes.string,
    isScrollHeader: PropTypes.number,
};

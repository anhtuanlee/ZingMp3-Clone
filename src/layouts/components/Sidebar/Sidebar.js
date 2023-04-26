import classNames from 'classnames/bind';
import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../../../components/Button/Button';
import { ArrowChevonLeft, ArrowChevonRight, Close } from '../../../components/Icons';
import Images from '../../../components/Image';
import { SIDEBAR_MENU } from '../../../redux/constant';
import { combinedStatusSelector } from '../../../redux/selector';
import { loginSlice, sidebarSlice, statusSlice } from '../../../redux/sliceReducer';
import styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idActive, dataUser, isSidebarMobile } = useSelector(combinedStatusSelector);
    const [isOpenSideBar, setOpenSideBar] = useState(false);
    const imgError =
        'https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png';

     
    const RenderMenuMain = ({ isTablet }) => {
        const result = SIDEBAR_MENU.map((item, index) => {
            const handleClickActive = (e, index) => {
                if (
                    idActive === index &&
                    e.currentTarget.dataset.index !== index.toString()
                ) {
                    dispatch(sidebarSlice.actions.setIdSidebarActive(null));

                    // if lastEl active will off when nextEl active
                } else {
                    dispatch(sidebarSlice.actions.setIdSidebarActive(index));
                }
                dispatch(statusSlice.actions.isSidebarMobile(false));

                localStorage.setItem('idActiveSidebar', JSON.stringify(index));
            };
            return (
                <SidebarItem
                    data={item}
                    key={index}
                    dataset={index}
                    isOpenSideBar={isOpenSideBar}
                    isActive={index === idActive ? true : false} // check isActive ?
                    onClick={(e) => handleClickActive(e, index)}
                    isTablet={isTablet}
                />
            );
        });
        return result;
    };

    const handleSign = () => {
        if (dataUser.accessToken) {
            navigate('..');
            dispatch(loginSlice.actions.setAccessToken(''));
            dispatch(loginSlice.actions.setListSongFavorite([]));
            toast.info('Đăng xuất thành công');
            dispatch(statusSlice.actions.isSidebarMobile(false));
        } else {
            dispatch(loginSlice.actions.setIsLogin(true));
        }
    };
    const handleCloseSideBar = () => {
        dispatch(statusSlice.actions.isSidebarMobile(false));
    };
    const handleOpenSideBar = () => {
        setOpenSideBar(!isOpenSideBar);
    };

    return (
        <Media
            queries={{
                small: '(max-width: 599px)',
                medium: '(min-width: 600px) and (max-width: 1199px)',
                large: '(min-width: 1200px)',
            }}
        >
            {(matches) => (
                <div>
                    {/* mobile */}
                    {matches.small && (
                        <div
                            className={cx(
                                'wrapper',
                                'mobile',
                                isSidebarMobile ? 'open' : 'close',
                            )}
                            onClick={handleCloseSideBar}
                        >
                            <div className={cx('container')}>
                                <span
                                    className={cx('btn_close_sidebar_mobile')}
                                    onClick={handleCloseSideBar}
                                >
                                    <Close />
                                </span>
                                <div className={cx('user')}>
                                    <figure>
                                        <Images
                                            className={cx('user_avatar')}
                                            src={
                                                dataUser.accessToken
                                                    ? dataUser.data.image
                                                    : imgError
                                            }
                                        />
                                    </figure>
                                    <div>
                                        {dataUser.accessToken && (
                                            <h3 className={cx('user_name')}>
                                                {dataUser?.data.user_name}
                                            </h3>
                                        )}
                                        <Button purplePrimary onHandle={handleSign}>
                                            {dataUser.accessToken
                                                ? 'Đăng Xuất'
                                                : 'Đăng Nhập'}
                                        </Button>
                                    </div>
                                </div>
                                <ul className={cx('menu_main')}>
                                    <RenderMenuMain />
                                </ul>
                            </div>
                        </div>
                    )}
                    {/* tablet */}
                    {matches.medium && (
                        <div className={cx('wrapper', isOpenSideBar ? 'poup_tablet' : 'tablet')}>
                            <div className={cx('inner')}>
                                <Link to="/" className={cx('logo')} />
                            </div>
                            <ul className={cx('menu_main')}>
                                <RenderMenuMain isTablet={true} />
                            </ul>
                            <Button
                                Icons={isOpenSideBar ? ArrowChevonLeft : ArrowChevonRight}
                                circle
                                className={cx('btn_arrow_sidebar')}
                                onHandle={handleOpenSideBar}
                            />
                        </div>
                    )}
                    {/* desktop */}
                    {matches.large && (
                        <div className={cx('wrapper')}>
                            <div className={cx('inner')}>
                                <Link to="/" className={cx('logo')} />
                            </div>
                            <ul className={cx('menu_main')}>
                                <RenderMenuMain />
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </Media>
    );
}

export default Sidebar;

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MyPlayer.module.scss';
import { combinedStatusSelector } from '../../redux/selector';
import { useEffect } from 'react';
import { getProfileUser } from '../../services/userApi';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';
import Form from '../../components/Form/Form';
import { featureSlice, loginSlice, sidebarSlice } from '../../redux/sliceReducer';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MyPlayer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataUser, isLogin } = useSelector(combinedStatusSelector);

    useEffect(() => {
        const fetch = async () => {
            const result = await getProfileUser(dataUser.accessToken).then((data) =>
                console.log(data),
            );
            return result;
        };
        fetch();
    }, [dataUser]);
    useEffect(() => { 
        if (Object.keys(dataUser.data).length === 0) {
            navigate('..');
            dispatch(loginSlice.actions.setIsLogin(true));
            dispatch(
                featureSlice.actions.setNotification({
                    title: 'Vui lòng đăng nhập để sử dụng chức năng này!',
                    styles: 'info',
                }),
            );
        }
        dispatch(sidebarSlice.actions.setIdSidebarActive(0));
    }, [isLogin]);
    return (
        dataUser.data.image && (
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title_section')}>
                        <TitlePage
                            title={`Thư Viện của ${dataUser.data.user_name}`}
                            sizes="medium"
                        />
                    </div>
                    <div className={cx('playlist_favorite')}></div>
                </div>
            </div>
        )
    );
}

export default MyPlayer;

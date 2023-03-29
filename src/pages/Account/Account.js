import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { sidebarSlice, statusSlice } from '../../redux/sliceReducer';
import { getSingerDataApi } from '../../services';
import Loading from '../Loading';
import styles from './Account.module.scss';
import ContentPageSinger from './ContentPageSinger/ContentPageSinger';
import HeaderPageSinger from './HeaderPageSinger/HeaderPageSinger';

const cx = classNames.bind(styles);
function AccountPage() {
    const { nickname } = useParams(); // getApi from
    const [dataSinger, setDataSinger] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetch = async () => {
            try {
                const result = await getSingerDataApi(nickname, 6).then((data) => {
                    setDataSinger(data);
                    dispatch(statusSlice.actions.isPageLoadingChange(false));
                });
                return result;
            } catch (error) {
                if (error) {
                    navigate('..');
                }
            }
        };
        fetch();
    }, [nickname]);

    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(null)); // not active sidebar
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header_account_page')}>
                <HeaderPageSinger data={dataSinger} />
            </header>
            <div className={cx('content_account_page')}>
                <ContentPageSinger data={dataSinger} />
            </div>
        </div>
    );
}

export default AccountPage;

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { activeSidebar } from '../../redux/actions';
import { getSingerData } from '../../services';
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
        const fetch = async () => {
            try {
                const result = await getSingerData(nickname).then((data) => {
                    setDataSinger(data);
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
        dispatch(activeSidebar(null)); // not active sidebar
    }, []);

    return dataSinger.length === 0 && nickname ? (
        <div className={cx('loading')}>
            <Loading />
        </div>
    ) : (
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

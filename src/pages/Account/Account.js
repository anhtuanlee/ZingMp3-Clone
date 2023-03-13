import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingerData } from '../../services';
import Loading from '../Loading';
import styles from './Account.module.scss';
import ContentPageSinger from './ContentPageSinger/ContentPageSinger';
import HeaderPageSinger from './HeaderPageSinger/HeaderPageSinger';

const cx = classNames.bind(styles);
function AccountPage() {
    const { nickname } = useParams(); // getApi from nickname
    const [dataSinger, setDataSinger] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await getSingerData(nickname).then((data) => {
                setDataSinger(data);
            });
            return result;
        };
        fetch();
    }, [nickname]);

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

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonEffectPlay } from '../../../components/Button';
import Images from '../../../components/Image';
import { combinedStatusSelector } from '../../../redux/selector';
import styles from '../Account.module.scss';
import Loading from '../../Loading';

const cx = classNames.bind(styles);

function HeaderPageSinger({ data = [] }) {
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    const [follower, setFollower] = useState();
    const singer_info = data[data.length - 1];

    useEffect(() => {
        const follower = singer_info?.favorite.toString();
        const result = follower?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.'); // add dot between 3 num
        setFollower(result);
    }, [singer_info?.favorite]);

    return isLoadingPage ? (
        <header
            className={cx('header_box')}
            style={{ display: ' flex', flexDirection: 'row', gap: 30 }}
        >
            <Loading styles={{ width: 140, paddingBottom: 140, borderRadius: 1000 }} />
            <div style={{ width: '90%', marginTop: 15 }}>
                <Loading styles={{ width: '60%', height: '6vh', marginBottom: 20 }} /> 
                <Loading styles={{ width: '40%', height: '4vh' }} />
            </div>
        </header>
    ) : (
        <header className={cx('header_box')}>
            <div className={cx('box_singer')}>
                <Images src={singer_info?.image_music} className={cx('image_singer')} />

                <div className={cx('singer_info')}>
                    <div className={cx('singer_name')}>
                        <h1> {singer_info?.name_singer}</h1>

                        <ButtonEffectPlay data={data} sizes="large"/>
                    </div>
                    <span className={cx('extra_title')}>{follower} người quan tâm</span>
                </div>
            </div>
        </header>
    );
}

export default HeaderPageSinger;

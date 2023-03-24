import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ButtonEffectPlay } from '../../../components/Button';
import Images from '../../../components/Image';
import styles from '../Account.module.scss';
const cx = classNames.bind(styles);

function HeaderPageSinger({ data = [] }) {
    const [follower, setFollower] = useState();
    const singer_info = data[data.length - 1];

    useEffect(() => {
        const follower = singer_info.favorite.toString();
        const result = follower.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.'); // add dot between 3 num
        setFollower(result);
    }, [singer_info.favorite]);

    return (
        <header className={cx('header_box')}>
            <div className={cx('box_singer')}>
                <Images
                    src={singer_info?.image_music}
                    className={cx('image_singer')}
                />

                <div className={cx('singer_info')}>
                    <div className={cx('singer_name')}>
                        <h1> {singer_info?.name_singer}</h1>

                        <ButtonEffectPlay sizes="large" />
                    </div>
                    <span className={cx('extra_title')}>
                        {follower} người quan tâm
                    </span>
                </div>
            </div>
        </header>
    );
}

export default HeaderPageSinger;

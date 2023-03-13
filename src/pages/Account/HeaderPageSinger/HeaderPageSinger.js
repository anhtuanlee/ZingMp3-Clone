import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pause, Play } from '../../../components/Icons';
import Images from '../../../components/Image';
import { playMusic } from '../../../redux/actions';
import { isPlayingSelector } from '../../../redux/selector';
import styles from '../Account.module.scss';
const cx = classNames.bind(styles);

function HeaderPageSinger({ data = [] }) {
    const dispatch = useDispatch(); 
    const _isPlay = useSelector(isPlayingSelector);

    const [follower, setFollower] = useState();  
    const singer_info = data[data.length - 1];  
    
    useEffect(() => {
        const follower = singer_info.favorite.toString();
        const result = follower.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
        setFollower(result);
    }, [singer_info.favorite]);

  

    const handleTogglePlaySong = () => {
        dispatch(playMusic(!_isPlay));
    };
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

                        <button
                            className={cx('icon_toggle_songs')}
                            onClick={handleTogglePlaySong}
                        >
                            {_isPlay ? <Pause /> : <Play />}
                        </button>
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

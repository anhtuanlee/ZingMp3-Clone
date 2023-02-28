import styles from './Controls.module.scss';
import classNames from 'classnames/bind';
import Images from '../../../components/Image';
import Button from '../../../components/Button';
import { Heart, More } from '../../../components/Icons';
import { useSelector } from 'react-redux';
import { currentIndexSelector, dataSongsSelector, songCurrentSelector } from '../../../redux/selector';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function ControlsLeft() {
    const dataUser = useSelector(dataSongsSelector);
    const _currentIndex = useSelector(currentIndexSelector);
    const _currentSong = useSelector(songCurrentSelector) 
    const currentUser = dataUser[_currentIndex]; 
   
    
    return (
        <div className={cx('player_control_left')}>
            <div className={cx('media_Images')}>
                <figure className={cx('item_img')}>
                    <Images src={_currentSong?.image_music} />
                </figure>
            </div>
            <div className={cx('media_content')}>
                <span className={cx('item_title')}>
                    {_currentSong?.name_music}
                </span>
                <h3 className={cx('item_subtitle')}>
                    {_currentSong?.name_singer}
                </h3>
            </div>
            <div className={cx('media_custom')}>
                <Button Icons={Heart} circle_hide extraTitle="favorite" />

                <Button Icons={More} circle_hide />
            </div>
        </div>
    );
}

export default ControlsLeft;

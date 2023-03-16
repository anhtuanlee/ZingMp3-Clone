import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { Heart, More } from '../../../components/Icons';
import Images from '../../../components/Image';
import { songCurrentSelector } from '../../../redux/selector';
import styles from './Controls.module.scss';
const cx = classNames.bind(styles);

function ControlsLeft() {
    const _currentSong = useSelector(songCurrentSelector);
    return (
        <div className={cx('player_control_left')}>
            <div className={cx('media_Images')}>
                <figure className={cx('item_img')}>
                    <Images src={_currentSong && _currentSong?.image_music} />
                </figure>
            </div>
            <div className={cx('media_content')}>
                <span className={cx('item_title')}>
                    {_currentSong?.name_music}
                </span>
                <Link
                    to={`/${_currentSong.slug_name_singer}`}
                    state={_currentSong.slug_name_singer}
                >
                    {' '}
                    {/* clean after */}
                    <h3 className={cx('item_subtitle')}>
                        {_currentSong?.name_singer}
                    </h3>
                </Link>
            </div>
            <div className={cx('media_custom')}>
                <Button Icons={Heart} circle_hide extraTitle="favorite" />

                <Button Icons={More} circle_hide />
            </div>
        </div>
    );
}

export default ControlsLeft;

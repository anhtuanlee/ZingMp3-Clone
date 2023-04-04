import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActionBtnAlbum } from '../../../Feature/ActionBtnAlbum';
import Images from '../../../components/Image';
import { combinedStatusSelector } from '../../../redux/selector';
import styles from './Controls.module.scss';
const cx = classNames.bind(styles);

function ControlsLeft({ styleImg, styleTitle }) {
    const { songCurrent } = useSelector(combinedStatusSelector);
    return (
        <div className={cx('player_control_left')}>
            <figure className={cx('item_img')}>
                <Images src={songCurrent && songCurrent?.image_music} type={styleImg} />
            </figure>   
            <div className={cx('media_content')}>
                <span className={(cx('item_title'), styleTitle)}>
                    {songCurrent?.name_music}
                </span>
                <Link
                    to={`/${songCurrent?.slug_name_singer}`}
                    state={songCurrent?.slug_name_singer}
                >
                    {/* clean after */}
                    <h3 className={cx('item_subtitle')}>{songCurrent?.name_singer}</h3>
                </Link>
            </div>
            <div className={cx('media_custom')}>
                <ActionBtnAlbum playlistSong />
            </div>
        </div>
    );
}

export default ControlsLeft;

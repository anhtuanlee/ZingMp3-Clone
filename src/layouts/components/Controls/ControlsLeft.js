import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Media from 'react-media';
import styles from './Controls.module.scss';
import Images from '../../../components/Image';
import { ActionBtnAlbum } from '../../../Feature/ActionBtnAlbum';
import { combinedStatusSelector } from '../../../redux/selector';

const cx = classNames.bind(styles);

function ControlsLeft({ styleImg, styleTitle, isMobile }) {
    const { songCurrent, isPlaying } = useSelector(combinedStatusSelector);

    return (
        <div className={cx('player_control_left')}>
            <figure className={cx('item_img', isPlaying && isMobile ? 'spin' : '')}>
                <Images
                    src={songCurrent && songCurrent?.image_music}
                    isControl={true} // loading skeleton just in control
                    type={styleImg}
                    isMobile={isMobile}
                />
            </figure>
            <div className={cx('media_content')}>
                <span className={cx('item_title', styleTitle)}>
                    {songCurrent?.name_music}
                </span>
                <h3 className={cx('item_subtitle')}>
                    <Link
                        to={`/${songCurrent?.slug_name_singer}`}
                        state={songCurrent?.slug_name_singer}
                    >
                        {/* clean after */}
                        {songCurrent?.name_singer}
                    </Link>
                </h3>
            </div>
            <div className={cx('media_custom')}>
                <Media query="(max-width: 1000px)">
                    {(matches) => {
                        return matches ? (
                            <ActionBtnAlbum
                                playlistSong
                                song={songCurrent}
                                sizeTablet={true}
                            />
                        ) : (
                            <ActionBtnAlbum playlistSong song={songCurrent} />
                        );
                    }}
                </Media>
            </div>
        </div>
    );
}

export default ControlsLeft;

ControlsLeft.propTypes = {
    styleImg: PropTypes.string,
    styleTitle: PropTypes.string,
    isMobile: PropTypes.bool,
};

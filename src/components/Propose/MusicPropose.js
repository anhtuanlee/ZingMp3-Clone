import classNames from 'classnames/bind';
import styles from './Propose.module.scss';
import PropTypes from 'prop-types';
import Images from '../Image';

const cx = classNames.bind(styles);
function MusicPropose({ data = {}, onHandle }) {
    const imgs = data.image_music;
    const imgError =
        'https://placehold.jp/3d4070/ffffff/150x150.png?text=No_Image';

    return (
        <div className={cx('wrapper')}>
            <div className={cx('song_container')} onClick={onHandle}>
                <Images
                    className={cx('img_song')}
                    src={imgs ? imgs : imgError}
                />
                <div className={cx('song_info')}>
                    <div className={cx('song_name')}>{data.name_music}</div>
                    <h3 className={cx('singer')}>{data.name_singer}</h3>
                </div>
            </div>
        </div>
    );
}
MusicPropose.propTypes = {
    data: PropTypes.object,
};
export default MusicPropose;

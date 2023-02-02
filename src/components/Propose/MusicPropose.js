import classNames from 'classnames/bind';
import styles from './Propose.module.scss';

const cx = classNames.bind(styles);
function MusicPropose({ data }) {
    const datacate = data.category.split(' ');

    const category = datacate.map((item) => {
        // fix word not synce
        const result = item.charAt(0).toUpperCase() + item.slice(1) + ' ';
        return result;
    });

    const imgs = data.image_music;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('song_container')}>
                <img className={cx('img_song')} src={imgs} />
                <div className={cx('song_info')}>
                    <div className={cx('song_name')}>{data.name_music}</div>
                    <h3 className={cx('singer')}>{data.name_singer}</h3>
                </div>
            </div>
        </div>
    );
}

export default MusicPropose;

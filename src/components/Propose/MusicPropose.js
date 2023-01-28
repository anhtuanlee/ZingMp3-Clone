import classNames from 'classnames/bind';
import styles from './Propose.module.scss';

const cx = classNames.bind(styles);
function MusicPropose({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('song_container')}>
                <img
                    className={cx('img_song')}
                    src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-rang-khenh.jpg"
                />
                <div className={cx('song_info')}>
                    <div className={cx('song_name')}>Ngày Chung Đôi</div>
                    <h3 className={cx('singer')}>Bé Dung</h3>
                </div>
            </div>
            {children}
        </div>
    );
}

export default MusicPropose;

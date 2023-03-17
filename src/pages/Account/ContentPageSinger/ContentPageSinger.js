import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PlayListSong from '../../../Feature/PlayListSong';
import styles from '../Account.module.scss';
const cx = classNames.bind(styles);

function ContentPageSinger({ data }) {
    const dataSlice = data ; // slice render 6 song
    const userSinger = data[data.length - 1].slug_name_singer 
    const resultRenderLeft = () => {
        if (dataSlice) {
            const result = dataSlice.map((song, index) => {
                if (index < 3) {
                    return (
                        <PlayListSong
                            data={dataSlice}
                            song={song}
                            index={index}
                            key={index}
                        />
                    );
                }
            });
            return result;
        }
    };

    const resultRenderRight = () => {
        if (data) {
            const result = dataSlice.map((song, index) => {
                if (index > 2 && index < 6) {
                    return (
                        <PlayListSong
                            data={dataSlice}
                            song={song}
                            index={index}
                            key={index}
                        />
                    );
                }
            });
            return result;
        }
    };

    return (
        <div className={cx('content_account_page')}>
            <div className={cx('container_songs_popular')}>
                {/* title_section */}
                <div className={cx('title_section')}>
                    <h3 className={cx('title_main')}>Bài Hát Nổi Bật</h3>
                    <Link to="album" state={userSinger}> {/* clean code */}
                        <span className={cx('list_songs_section')}>
                            <span>TẤT CẢ</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </Link>
                </div>
                {/* list songs */}
                <div className={cx('list_songs')}>
                    <div className={cx('playlist_songs_left')}>
                        {resultRenderLeft()}
                    </div>

                    <div className={cx('playlist_songs_right')}>
                        {resultRenderRight()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentPageSinger;

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Mic, More, Multi, Play } from '../../../components/Icons';
import Button from '../../../components/Button';
import Images from '../../../components/Image';
import {
    currentSong,
    dataSongs,
    playMusic,
    setCurrentID,
} from '../../../redux/actions';
import {
    isPlayingSelector,
    songCurrentSelector,
} from '../../../redux/selector';
import styles from '../Account.module.scss';
import WaveSong from '../WaveSong';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ContentPageSinger({ data }) {
    const dispatch = useDispatch();
    const _songCurrent = useSelector(songCurrentSelector);
    const _isPlaying = useSelector(isPlayingSelector);

    const [isHover, setIsHover] = useState(false);
    const [element, setElement] = useState();

    const handlePlaySong = (data, index) => {
        const dataRender = data?.slice(0, 6); // just take 6 first songs to render

        data[index]._id === _songCurrent._id
            ? dispatch(playMusic(!_isPlaying))
            : dispatch(playMusic(true));
        dispatch(dataSongs(dataRender));
        dispatch(currentSong(dataRender[index]));
        dispatch(setCurrentID(index));

        localStorage.setItem('listSongsData', JSON.stringify(dataRender));
    };
    const handleHoverMusic = (e, index) => {
        if (e.target.dataset.index === index.toString()) { 
            setIsHover(true);
            setElement(e.target.dataset.index);
        }
    };

    const handleLeaveMusic = () => {
        setIsHover(false);
    };
    const renderListSong = (song, index) => {
        return (
            <div
                className={cx(
                    'song_item_container',
                    _songCurrent._id === song._id ? 'isActive' : '',
                )}
                key={index}
                data-index={index} 
                onDoubleClick={() => handlePlaySong(data, index)}
                onMouseOver={(e) => handleHoverMusic(e, index)}
                onMouseLeave={handleLeaveMusic}
            >
                <div className={cx('songs_item_left')}>
                    <figure
                        className={cx('image_song_item')}
                        onClick={() => handlePlaySong(data, index)}
                    >
                        <Images src={song?.image_music} />
                        <span className={cx('icon_inner_avatar')}>
                            {_songCurrent._id === song._id && _isPlaying ? (
                                <div className={cx('box_container')}>
                                    <WaveSong />
                                </div>
                            ) : (
                                <Play />
                            )}
                        </span>
                    </figure>
                    <div className={cx('title_song_item')}>
                        <h4 className={cx('name_song_item')}>
                            {song.name_music}
                        </h4>
                        <span className={cx('name_singer_item')}>
                            {song.name_singer}
                        </span>
                    </div>
                </div>
                <div className={cx('song_item_right')}>
                    {isHover && element === index.toString() ? ( // check element current ===  element hover will use effect 
                        <div className={cx('items_hover')}>
                            <Button Icons={Mic} circle_hide sizes="medium" />
                            <Button Icons={Heart} circle_hide sizes="medium" />
                            <Button Icons={More} circle_hide sizes="medium" />
                        </div>
                    ) : (
                        <div className={cx('item_format_time')}>
                            {song.time_format}
                        </div>
                    )}
                </div>
            </div>
        );
    };
    const resultRenderLeft = () => {
        if (data) {
            const result = data.map((song, index) => {
                if (index < 3) {
                    return renderListSong(song, index);
                }
            });
            return result;
        }
    };
    const resultRenderRight = () => {
        if (data) {
            const result = data.map((song, index) => {
                if (index > 2 && index < 6) {
                    return renderListSong(song, index);
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
                    <span className={cx('list_songs_section')}>
                        <Link to="album">TẤT CẢ</Link>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
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

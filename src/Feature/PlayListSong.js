import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Play, SubTract, WaveSongPlay } from '../components/Icons';
import Images from '../components/Image';
import { useConvertNumber } from '../hooks/';
import {
    currentSong,
    dataSongs,
    playMusic,
    setCurrentID,
    slugNameCheck,
} from '../redux/actions';
import {
    isPlayingSelector,
    slugDataBannerSelector,
    songCurrentSelector,
} from '../redux/selector';
import { ActionBtnAlbum } from './ActionBtnAlbum';
import styles from './PlayListSong.module.scss';

const cx = classNames.bind(styles);

function PlayListSong({
    data = [],
    song,
    index,
    rank,
    HomePageTrending = false, // styles off class
}) {
    const dispatch = useDispatch();
    const _songCurrent = useSelector(songCurrentSelector);
    const _isPlaying = useSelector(isPlayingSelector); 
    const [isHover, setIsHover] = useState(false);
    const [element, setElement] = useState('');

    const favoriteRender = useConvertNumber(song.favorite);
    const handleConfig = (data, song, index, e) => {
        if (data) {
            if (song._id === _songCurrent._id) {
                dispatch(playMusic(!_isPlaying));
            } else {
                dispatch(playMusic(true));
            }
            dispatch(dataSongs(data));
            dispatch(currentSong(data[index]));
            dispatch(setCurrentID(index));

            localStorage.setItem('listSongsData', JSON.stringify(data));
            localStorage.setItem('songRecent', JSON.stringify(data[index]));
            localStorage.setItem('currentIndex', JSON.stringify(index));
        }
    };

    const handlePlaySong = (data, song, index) => {
        // click avatar or Wavesong will playsong
        return handleConfig(data, song, index);
    };

    const handleDubleClickPlaySong = (e, data, song, index) => {
        //dubbleClick parent will play song not
        if (e.target.parentElement === e.currentTarget) {
            return handleConfig(data, song, index, e);
        }
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

    const RankSong = () => {
        const numberRankClassName = `is-top-rank-${index + 1}`;
        return (
            <div className={cx('song_prefix')}>
                <span className={cx('number_title', numberRankClassName)}>
                    {index + 1}
                </span>
                <span className={cx('song_title_rank')}>
                    <SubTract />
                </span>
            </div>
        );
    };

    return (
        <div
            className={cx(
                'song_item_container',
                _songCurrent?._id === song?._id ? 'isActive' : '',
                { HomePageTrending },
            )}
            key={index}
            data-index={index}
            onDoubleClick={(e) =>
                handleDubleClickPlaySong(e, data, song, index)
            }
            onMouseOver={(e) => handleHoverMusic(e, index)}
            onMouseLeave={handleLeaveMusic}
        >
            {rank && <RankSong />}

            <div className={cx('container_song_section')}>
                <div className={cx('songs_item_left')}>
                    <figure
                        className={cx('image_song_item')}
                        onClick={(e) => handlePlaySong(data, song, index)}
                    >
                        <Images src={song?.image_music} />
                        <span className={cx('icon_inner_avatar')}>
                            {_songCurrent?._id === song?._id && _isPlaying ? (
                                <WaveSongPlay />
                            ) : (
                                <Play />
                            )}
                        </span>
                    </figure>
                    <div className={cx('title_song_item')}>
                        <h4 className={cx('name_song_item')}>
                            {song.name_music}
                        </h4>
                        <Link
                            to={`/${song.slug_name_singer}`}
                            state={song.slug_name_singer}
                        >
                            {/* clean code */}
                            <span className={cx('name_singer_item')}>
                                {song.name_singer}
                            </span>
                        </Link>

                        {/* favorite of trending music */}
                        {HomePageTrending && (
                            <span className={cx('song_trending_favorite')}>
                                <FontAwesomeIcon icon={faHeart} />
                                {favoriteRender}
                            </span>
                        )}
                    </div>
                </div>
                <div className={cx('song_item_right')}>
                    {isHover && element === index.toString() ? ( // check element current ===  element hover will use effect
                        <div className={cx('items_hover')}>
                            <ActionBtnAlbum
                                HomePageTrending={HomePageTrending}
                                playlistSong={true}
                            />
                            {/* check  */}
                        </div>
                    ) : (
                        <div className={cx('item_format_time')}>
                            {song.time_format}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlayListSong;

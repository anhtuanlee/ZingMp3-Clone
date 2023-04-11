import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { ListQueue, Play, SubTract, WaveSongPlay } from '../components/Icons';
import Images from '../components/Image';
import { convertNumber } from '../hooks/';
import { combinedStatusSelector } from '../redux/selector';
import { featureSlice, statusSlice } from '../redux/sliceReducer';
import { ActionBtnAlbum } from './ActionBtnAlbum';
import styles from './PlayListSong.module.scss';
const cx = classNames.bind(styles);

function PlayListSong(
    {
        data = [],
        song,
        index,
        rank,
        HomePageTrending = false, // styles off class
        MyPlayerPage = false,
        isListQueue,
    },
    ref,
) {
    const dispatch = useDispatch();
    const { songCurrent, isPlaying } = useSelector(combinedStatusSelector);
    const [isHover, setIsHover] = useState(false);
    const [element, setElement] = useState('');
    const songItemRef = useRef();
    const favoriteRender = convertNumber(song?.favorite);
    const handleConfig = (data, song, index, e) => {
        if (data) {
            if (song._id === songCurrent._id) {
                dispatch(statusSlice.actions.isPlayingChange(!isPlaying));
            } else {
                dispatch(statusSlice.actions.isPlayingChange(true));
            }
            dispatch(featureSlice.actions.setDataSongs(data));
            dispatch(featureSlice.actions.setSongCurrent(data[index]));
            dispatch(featureSlice.actions.setCurrentID(index));
        }
    };
    const handlePlaySong = (data, song, index) => {
        // click avatar or Wavesong will playsong
        return handleConfig(data, song, index);
    };

    const handleDubleClickPlaySong = (e, data, song, index) => {
        //dubbleClick parent will play song not

        return handleConfig(data, song, index, e);
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

    useEffect(() => {
        // effect scroll with react-scro
        if (songCurrent?._id === song?._id && isPlaying && !HomePageTrending) {
            scroll.scrollTo(
                songItemRef.current.offsetTop - (isListQueue ? 250 : 410), // check to scroll smooth location
                {
                    containerId: ref?.current?.id,
                    duration: 2000,
                    delay: 500,
                    smooth: 'easeOutCubic',
                },
            );
        }
    }, [songCurrent, isPlaying]);
    return (
        <div
            ref={songItemRef}
            className={cx(
                'song_item_container',
                songCurrent?._id === song?._id
                    ? isListQueue
                        ? 'isActiveListQueue'
                        : 'isActive'
                    : '',
                { HomePageTrending },
            )}
            key={index}
            data-index={index}
            onDoubleClick={(e) => handleDubleClickPlaySong(e, data, song, index)}
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
                            {songCurrent?._id === song?._id && isPlaying ? (
                                <WaveSongPlay />
                            ) : (
                                <Play />
                            )}
                        </span>
                    </figure>
                    <div className={cx('title_song_item')}>
                        <h4 className={cx('name_song_item')}>{song.name_music}</h4>
                        <Link
                            to={`/${song.slug_name_singer}`}
                            state={song.slug_name_singer}
                        >
                            <span className={cx('name_singer_item')}>
                                {song.name_singer}
                            </span>
                        </Link>

                        {/* favorite of trending music */}
                        {HomePageTrending && (
                            <span className={cx('song_trending_favorite')}>
                                <FontAwesomeIcon icon={faHeart} /> {favoriteRender}
                            </span>
                        )}
                    </div>
                </div>
                <div className={cx('song_item_right')}>
                    {isHover && element === index.toString() && !MyPlayerPage ? ( // check element current ===  element hover will use effect
                        <div className={cx('items_hover')}>
                            <ActionBtnAlbum
                                HomePageTrending={HomePageTrending}
                                song={song}
                                playlistSong={true}
                                isListQueue={
                                    songCurrent?._id === song?._id && isListQueue
                                        ? isListQueue
                                        : undefined
                                }
                            />
                            {/* check  */}
                        </div>
                    ) : (
                        <div className={cx('item_format_time')}>{song.time_format}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.forwardRef(PlayListSong);

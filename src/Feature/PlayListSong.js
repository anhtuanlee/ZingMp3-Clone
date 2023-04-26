import Media from 'react-media';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { animateScroll as scroll } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';

import Images from '../components/Image';
import { convertNumber } from '../hooks/';
import { ActionBtnAlbum } from './ActionBtnAlbum';
import styles from './PlayListSong.module.scss';
import { combinedStatusSelector } from '../redux/selector';
import { featureSlice, radioSlice, statusSlice } from '../redux/sliceReducer';
import { HeartFull, Play, SubTract, WaveSongPlay } from '../components/Icons';

const cx = classNames.bind(styles);

function PlayListSong(
    {
        data = [],
        song,
        index,
        isRank,
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
    const refItem = useRef();
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
            // turn off radio when play playlist
            dispatch(radioSlice.actions.setUrlRadio(''));
            dispatch(radioSlice.actions.setIsPlayingRadio(false));
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
        <Media
            queries={{
                mobile: '(max-width: 600px)',
            }}
        >
            {(matches) => {
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
                        onDoubleClick={(e) =>
                            !matches.mobile &&
                            handleDubleClickPlaySong(e, data, song, index)
                        }
                        onClick={(e) =>
                            matches.mobile &&
                            handleDubleClickPlaySong(e, data, song, index)
                        }
                        onMouseOver={(e) => handleHoverMusic(e, index)}
                        onMouseLeave={handleLeaveMusic}
                    >
                        {isRank && <RankSong />}

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
                                <div className={cx('title_song_item')} ref={refItem}>
                                    <h4 className={cx('name_song_item')}>
                                        {song.name_music}
                                    </h4>
                                    <span className={cx('name_singer_item')}>
                                        <Link
                                            to={`/${song.slug_name_singer}`}
                                            state={song.slug_name_singer}
                                        >
                                            {song.name_singer}
                                        </Link>
                                    </span>

                                    {/* favorite of trending music */}
                                    {HomePageTrending && (
                                        <span className={cx('song_trending_favorite')}>
                                            <HeartFull /> {favoriteRender}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={cx('song_item_right')}>
                                {isHover &&
                                element === index.toString() &&
                                !MyPlayerPage ? ( // check element current ===  element hover will use effect
                                    <div className={cx('items_hover')}>
                                        <ActionBtnAlbum
                                            HomePageTrending={HomePageTrending}
                                            song={song}
                                            playlistSong={true}
                                            isListQueue={
                                                songCurrent?._id === song?._id &&
                                                isListQueue
                                                    ? isListQueue
                                                    : undefined
                                            }
                                        />
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
            }}
        </Media>
    );
}

export default React.forwardRef(PlayListSong);

PlayListSong.propTypes = {
    data: PropTypes.array,
    song: PropTypes.object,
    index: PropTypes.number,
    isRank: PropTypes.bool,
    HomePageTrending: PropTypes.bool,
};

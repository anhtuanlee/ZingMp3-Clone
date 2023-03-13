import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, WaveSongPlay } from '../components/Icons';
import Images from '../components/Image';
import {
    currentSong,
    dataSongs,
    playMusic,
    setCurrentID
} from '../redux/actions';
import { isPlayingSelector, songCurrentSelector } from '../redux/selector';
import ActionRight from './ActionRight';
import styles from './PlayListSong.module.scss';

const cx = classNames.bind(styles);

function PlayListSong({ data, song, index }) {
    const dispatch = useDispatch();
    const _songCurrent = useSelector(songCurrentSelector);
    const _isPlaying = useSelector(isPlayingSelector);

    const [isHover, setIsHover] = useState(false);
    const [element, setElement] = useState('');

    const handleConfig = (data, song, index, e) => {
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
    };

    const handlePlaySong = (data, song, index) => {
        // click avatar or Wavesong will playsong
        return handleConfig(data, song, index);
    };
    
    const handleDubleClickPlaySong = (e, data, song, index) => {
        //dubbleClick parent will play song not feature
        if (e.target === e.currentTarget) {
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

    return (
        <div
            className={cx(
                'song_item_container',
                _songCurrent._id === song?._id ? 'isActive' : '',
            )}
            key={index}
            data-index={index}
            onDoubleClick={(e) =>
                handleDubleClickPlaySong(e, data, song, index)
            }
            onMouseOver={(e) => handleHoverMusic(e, index)}
            onMouseLeave={handleLeaveMusic}
        >
            <div className={cx('songs_item_left')}>
                <figure
                    className={cx('image_song_item')}
                    onClick={(e) => handlePlaySong(data, song, index)}
                >
                    <Images src={song?.image_music} />
                    <span className={cx('icon_inner_avatar')}>
                        {_songCurrent._id === song._id && _isPlaying ? (
                            <WaveSongPlay />
                        ) : (
                            <Play />
                        )}
                    </span>
                </figure>
                <div className={cx('title_song_item')}>
                    <h4 className={cx('name_song_item')}>{song.name_music}</h4>
                    <span className={cx('name_singer_item')}>
                        {song.name_singer}
                    </span>
                </div>
            </div>
            <div className={cx('song_item_right')}>
                {isHover && element === index.toString() ? ( // check element current ===  element hover will use effect
                    <div className={cx('items_hover')}>
                        <ActionRight />
                    </div>
                ) : (
                    <div className={cx('item_format_time')}>
                        {song.time_format}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayListSong;

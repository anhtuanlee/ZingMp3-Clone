import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import {
    Loading,
    Next,
    Pause,
    Play,
    Prev,
    Random,
    Repeat,
} from '../../../components/Icons';
import { useTimes } from '../../../hooks';
import {
    currentSong,
    dataSongs,
    pauseMusic,
    playMusic,
    randomSong,
    repeatSong,
    setCurrentID,
} from '../../../redux/actions';
import {
    currentIndexSelector,
    dataSongsSelector,
    isLoadingSelector,
    isPlayingSelector,
    isRandomSelector,
    isRepeatSelector,
    songCurrentSelector,
    timesSelector,
} from '../../../redux/selector';
import InputProgress from '../InputProgress';
import styles from './Controls.module.scss';
const cx = classNames.bind(styles);

function ControlsCenter({ audioRef }) {
    const dispatch = useDispatch();
    const _isPlay = useSelector(isPlayingSelector);
    const _isRepeat = useSelector(isRepeatSelector);
    const _isRandom = useSelector(isRandomSelector);
    const _isLoading = useSelector(isLoadingSelector);
    const _times = useSelector(timesSelector);
    const _songCurrent = useSelector(songCurrentSelector);
    let index = useSelector(currentIndexSelector);
    const _dataSongs = useSelector(dataSongsSelector);
    //times display

    const timeRemain = useTimes(_times.currentTime);
    const [randomIndex, setRandomIndex] = useState([]);
    const list = new Set(randomIndex); // List save random index and reset at full

    // custom handle with type
    const handleControlMain = (type) => {
        switch (type) {
            case 'play':
                dispatch(playMusic(_isPlay ? false : true));
                break;
            case 'pause':
                dispatch(pauseMusic(_isPlay ? false : true));
                break;
            case 'next':
                if (index < _dataSongs.length - 1) {
                    _isRandom ? handleRandom() : index++;
                } else {
                    index = 0;
                }
                dispatch(playMusic(true));
                dispatch(dataSongs(_dataSongs));
                dispatch(setCurrentID(index));
                dispatch(currentSong(_dataSongs[index]));

                break;
            case 'prev':
                if (index > 0) {
                    _isRandom ? handleRandom() : index--;
                } else {
                    index = _dataSongs.length - 1;
                }
                dispatch(playMusic(true));
                dispatch(dataSongs(_dataSongs));
                dispatch(setCurrentID(index));
                dispatch(currentSong(_dataSongs[index]));
                break;
            case 'repeat':
                dispatch(repeatSong(!_isRepeat));
                break;
            case 'random':
                dispatch(randomSong(!_isRandom));
                break;
            default:
                console.log('default');
        }
    };
    // control main handle
    const CONTROL_BTNS_CENTER = [
        {
            data: [
                {
                    icon: Random,
                    active: _isRandom ? true : false,
                    extraTitle: _isRandom
                        ? 'Tắt phát ngẫu nhiên'
                        : 'Bật phát ngẫu nhiên',
                    type: 'random',
                },
                {
                    icon: Prev,
                    type: 'prev',
                },
                {
                    icon: _isPlay && !_isLoading ? Pause : Play,
                    iconLoading: _isLoading ? Loading : undefined,
                    border: true,
                    circle_hide: true,
                    type: _isPlay ? 'play' : 'pause',
                },

                {
                    icon: Next,
                    type: 'next',
                },
                {
                    icon: Repeat,
                    active: _isRepeat ? true : false,
                    extraTitle: !_isRepeat
                        ? 'Bật phát lại một bài'
                        : 'Tắt phát lại',
                    type: 'repeat',
                },
            ],
        },
    ];
    // play pause
    useEffect(() => {
        if (audioRef) {
            if (_isPlay) {
                audioRef.current.muted = false;
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [_isPlay]);

    useEffect(() => {
        localStorage.setItem('isRandom', JSON.stringify(_isRandom));
    }, [_isRandom]);

    useEffect(() => {
        localStorage.setItem('isRepeat', JSON.stringify(_isRepeat));
    }, [_isRepeat]);

    //handle
    const handleRandom = () => {
        let random;
        const songsLength = _dataSongs.length;
        do {
            random = Math.ceil(Math.random() * _dataSongs.length);
            setRandomIndex((prev) => [...prev, random]);
        } while (list.has(random));
        index = random;
        setRandomIndex((prev) => [...prev, index]);

        if (list.size === songsLength - 1) {
            setRandomIndex([]);
        }
    };

    const lastData = CONTROL_BTNS_CENTER[CONTROL_BTNS_CENTER.length - 1].data;
    const renderControlsBtn = lastData.map((btn, index) => {
        const isCircleHide = btn.circle_hide;
        return (
            <Button
                circle_hide={isCircleHide ? false : true}
                border={btn?.border}
                borderFixPlay={btn?.borderFixPlay} // fix play center
                extraTitle={btn.extraTitle}
                isLoading={btn.iconLoading ? true : false}
                Icons={btn.iconLoading || btn.icon}
                key={index}
                active={btn.active}
                onHandle={() => handleControlMain(btn.type)}
            />
        );
    });
    return (
        <div className={cx('player_controls_center')}>
            <div className={cx('player_controls_center_container')}>
                <div className={cx('controls')}>{renderControlsBtn}</div>
                <div className={cx('progress_full')}>
                    <div className={cx('duration_bar')}>
                        <span className={cx('time_start')}>{timeRemain} </span>
                        <div className={cx('progress_container')}>
                            <InputProgress
                                max={100}
                                step={1}
                                audioType={true}
                                audioRef={audioRef}
                            />
                        </div>
                        <span className={cx('time_end')}>
                            {_songCurrent?.time_format}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
ControlsCenter.propTypes = {
    audioRef: PropTypes.object,
};
export default ControlsCenter;

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
    loading,
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
    const time = useSelector(timesSelector);
    let index = useSelector(currentIndexSelector);
    const _dataSongs = useSelector(dataSongsSelector);
    //times display

    const timeRemain = useTimes(time.currentTime);
    const timeDuration = useTimes(time.duration);
    const [timePlay, settimePlay] = useState();
    const [randomIndex, setRandomIndex] = useState([]);
    const list = new Set(randomIndex);
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

    //time update
    useEffect(() => {
        settimePlay(timeRemain);
        localStorage.setItem('currentTime', JSON.stringify(time.currentTime));
    }, [timeRemain]);

    // play pause
    useEffect(() => {
        if (audioRef) {
            if (_isPlay) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [_isPlay]);

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
                    borderFixPlay: _isPlay ? false : true,
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
    // custom handle with type
    const handle = (type) => {
        switch (type) {
            case 'play':
                dispatch(playMusic(_isPlay ? false : true));
                dispatch(loading(false));
                console.log(time.currentTime)
                break;
            case 'pause':
                dispatch(pauseMusic(_isPlay ? false : true));
                dispatch(loading(false));
                console.log(time.currentTime)

                break;
            case 'next':
                if (index < _dataSongs.length - 1) {
                    _isRandom ? handleRandom() : index++;
                } else {
                    index = 0;
                }

                dispatch(playMusic(true));
                dispatch(setCurrentID(index));
                dispatch(currentSong(index));

                break;
            case 'prev':
                if (index > 0) {
                    _isRandom ? handleRandom() : index--;
                } else {
                    index = _dataSongs.length - 1;
                }
                dispatch(playMusic(true));
                dispatch(setCurrentID(index));
                dispatch(currentSong(index));
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
                onHandle={() => handle(btn.type)}
            />
        );
    });

    return (
        <div className={cx('player_controls_center')}>
            <div className={cx('player_controls_center_container')}>
                <div className={cx('controls')}>{renderControlsBtn}</div>
                <div className={cx('progress_full')}>
                    <div className={cx('duration_bar')}>
                        <span className={cx('time_start')}>{timePlay} </span>
                        <div className={cx('progress_container')}>
                            <InputProgress
                                max={100}
                                step={1}
                                audioType={true}
                                audioRef={audioRef}
                            />
                        </div>
                        <span className={cx('time_end')}>{timeDuration}</span>
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

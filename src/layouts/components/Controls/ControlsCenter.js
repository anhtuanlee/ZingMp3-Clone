import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Controls.module.scss';
import classNames from 'classnames/bind';
import {
    Next,
    Pause,
    Play,
    Prev,
    Random,
    Repeat,
} from '../../../components/Icons';
import Button from '../../../components/Button';
import InputProgress from '../InputProgress';
import { playMusic, pauseMusic, nextMusic } from '../../../redux/actions';
import { isPlaying, times, songs, currentIndex } from '../../../redux/selector';
import { useTimes } from '../../../hooks';
const cx = classNames.bind(styles);

function ControlsCenter({ audioRef }) {
    const dispatch = useDispatch();
    const isPlay = useSelector(isPlaying);
    const time = useSelector(times);

    let index = useSelector(currentIndex); 
    //Songs
    const songsPlay = useSelector(songs);
    //times display
    const timeRemain = useTimes(time.currentTime);
    const timeDuration = useTimes(time.duration);
    const [timePlay, settimePlay] = useState(); 
    useEffect(() => {
        //time update
        settimePlay(timeRemain);
    }, [timeRemain]);

    // play pause
    useEffect(() => {
        if (isPlay) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlay]);
    const CONTROL_BTNS_CENTER = [
        {
            data: [
                {
                    icon: Random,
                    extraTitle: 'Bật phát ngẫu nhiên',
                },
                {
                    icon: Prev,
                    type: 'prev'
                },
                {
                    icon: isPlay ? Pause : Play,
                    border: true,
                    circle_hide: true,
                    type: isPlay ? 'play' : 'pause',
                },

                {
                    icon: Next,
                    type: 'next',
                },
                {
                    icon: Repeat,
                    extraTitle: 'Bật phát lại tất cả',
                },
            ],
        },
    ];

    // custom handle with type
    const handle = (type) => {
        switch (type) {
            case 'play':
                dispatch(playMusic(isPlay ? false : true));
                break;
            case 'pause':
                dispatch(pauseMusic(isPlay ? false : true));
                break;
            case 'next':
                if (index < songsPlay.length - 1) {
                    index++;
                    dispatch(nextMusic(index));
                    dispatch(playMusic(true));
                    setTimeout(function () {
                        // fix bug audioRef pending cant next
                        audioRef.current.play();
                    }, 0);
                } else {
                    index = 0;
                    dispatch(nextMusic(index));
                    dispatch(playMusic(true));
                    setTimeout(function () {
                        // fix bug audioRef pending cant next
                        audioRef.current.play();
                    }, 0);
                }

                break;
            case 'prev':
                if (index > 0) {
                    index--;
                    dispatch(nextMusic(index));
                    dispatch(playMusic(true));
                    setTimeout(function () {
                        // fix bug audioRef pending cant next
                        audioRef.current.play();
                    }, 0);
                } else {
                    index = songsPlay.length - 1;
                    dispatch(nextMusic(index));
                    dispatch(playMusic(true));
                    setTimeout(function () {
                        // fix bug audioRef pending cant next
                        audioRef.current.play();
                    }, 0);
                } 
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
                extraTitle={btn.extraTitle}
                Icons={btn.icon}
                key={index}
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

export default ControlsCenter;

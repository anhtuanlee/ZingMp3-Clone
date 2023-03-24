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
import { combinedStatusSelector } from '../../../redux/selector';
import { featureSlice, statusSlice } from '../../../redux/sliceReducer';
import InputProgress from '../InputProgress';
import styles from './Controls.module.scss';
const cx = classNames.bind(styles);

function ControlsCenter({ audioRef }) {
    const dispatch = useDispatch();
    const { isPlaying, isRandom, isRepeat, dataSongs, isLoading, times, songCurrent } =
        useSelector(combinedStatusSelector);
    let { currentIndex } = useSelector(combinedStatusSelector);
    //times display

    const timeRemain = useTimes(times.currentTime);
    const [randomIndex, setRandomIndex] = useState([]);
    const list = new Set(randomIndex); // List save random currentIndex and reset at full

    //handleChangeIndex main
    const handleSetIndexChange = (currentIndex) => {
        dispatch(statusSlice.actions.isPlayingChange(true));
        dispatch(featureSlice.actions.setCurrentID(currentIndex));
        dispatch(featureSlice.actions.setSongCurrent(dataSongs[currentIndex]));
    };
    //handle random
    const handleRandom = (currentIndex) => {
        let random;
        const songsLength = dataSongs.length;
        do {
            random = Math.ceil(Math.random() * dataSongs.length);
            setRandomIndex((prev) => [...prev, random]);
        } while (list.has(random));
        currentIndex = random;
        setRandomIndex((prev) => [...prev, currentIndex]);

        if (list.size === songsLength - 1) {
            setRandomIndex([]);
        }
    };

    // custom handle with type
    const handleControlMain = (type) => {
        switch (type) {
            case 'play':
                dispatch(statusSlice.actions.isPlayingChange(isPlaying ? false : true));
                break;
            case 'pause':
                dispatch(statusSlice.actions.isPlayingChange(isPlaying ? false : true));
                break;
            case 'next':
                if (currentIndex < dataSongs.length - 1) {
                    isRandom ? handleRandom(currentIndex) : currentIndex++;
                } else {
                    currentIndex = 0;
                }
                handleSetIndexChange(currentIndex);
                break;
            case 'prev':
                if (currentIndex > 0) {
                    isRandom ? handleRandom(currentIndex) : currentIndex--;
                } else {
                    currentIndex = dataSongs.length - 1;
                }
                handleSetIndexChange(currentIndex);
                break;
            case 'repeat':
                dispatch(statusSlice.actions.isRepeatChange(!isRepeat));
                break;
            case 'random':
                dispatch(statusSlice.actions.isRandomChange(!isRandom));
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
                    active: isRandom ? true : false,
                    extraTitle: isRandom ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên',
                    type: 'random',
                },
                {
                    icon: Prev,
                    type: 'prev',
                },
                {
                    icon: isPlaying && !isLoading ? Pause : Play,
                    iconLoading: isLoading ? Loading : undefined,
                    border: true,
                    circle_hide: true,
                    type: isPlaying ? 'play' : 'pause',
                },

                {
                    icon: Next,
                    type: 'next',
                },
                {
                    icon: Repeat,
                    active: isRepeat ? true : false,
                    extraTitle: !isRepeat ? 'Bật phát lại một bài' : 'Tắt phát lại',
                    type: 'repeat',
                },
            ],
        },
    ];
    // play pause
    useEffect(() => {
        if (audioRef) {
            if (isPlaying) {
                audioRef.current.muted = false;
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        localStorage.setItem('isRandom', JSON.stringify(isRandom));
    }, [isRandom]);

    useEffect(() => {
        localStorage.setItem('isRepeat', JSON.stringify(isRepeat));
    }, [isRepeat]);

    const lastData = CONTROL_BTNS_CENTER[CONTROL_BTNS_CENTER.length - 1].data;
    const renderControlsBtn = lastData.map((btn, currentIndex) => {
        const isCircleHide = btn.circle_hide;
        return (
            <Button
                circle_hide={isCircleHide ? false : true}
                border={btn?.border}
                borderFixPlay={btn?.borderFixPlay} // fix play center
                extraTitle={btn.extraTitle}
                isLoading={btn.iconLoading ? true : false}
                Icons={btn.iconLoading || btn.icon}
                key={currentIndex}
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
                        <span className={cx('time_end')}>{songCurrent?.time_format}</span>
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

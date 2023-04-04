import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import { ListQueue, Multi, Mv, Volumn, VolumnOff } from '../../../components/Icons';
import { combinedStatusSelector } from '../../../redux/selector';
import { statusSlice } from '../../../redux/sliceReducer';
import InputProgress from '../InputProgress';
import styles from './Controls.module.scss';
const cx = classNames.bind(styles);

function ControlsRight({ audioRef }) {
    const [style, setStyles] = useState(false);
    const { isVolume, songCurrent, isPlayerQueue } = useSelector(combinedStatusSelector);

    const dispatch = useDispatch();

    const CONTROL_BTNS_RIGHT = [
        {
            data: [
                {
                    icon: Mv,
                    disable: songCurrent?.link_mv ? false : true,
                    type: 'mv',
                    extraTitle: 'MV'
                },

                {
                    icon: Multi,
                    extraTitle: 'Chế độ cửa sổ',
                },
                {
                    icon: isVolume ? Volumn : VolumnOff,
                    type: 'volume',
                    extraTitle: 'Âm Lượng'
                },
            ],
        },
    ];
    const handle = (action) => {
        switch (action) {
            case 'volume':
                dispatch(statusSlice.actions.isVolumeChange(!isVolume));
                break;
            case 'mv':
                dispatch(statusSlice.actions.isMvPlayerChange(true));
                dispatch(statusSlice.actions.isPlayingChange(false));
                break;
            default:
                console.log('default');
        }
    };
    const hnadleListQueue = () => {
        // handle queue list song
        if (isPlayerQueue) {
            dispatch(statusSlice.actions.isCheckBeforeContentHide(true));
            setTimeout(() => {
                dispatch(statusSlice.actions.isPlayerQueue(false));
                dispatch(statusSlice.actions.isCheckBeforeContentHide(false));
            }, 500);
        } else {
            dispatch(statusSlice.actions.isPlayerQueue(true));
        }
    };

    const lastData = CONTROL_BTNS_RIGHT[CONTROL_BTNS_RIGHT.length - 1].data;
    const classes = style ? 'blur_input' : '';
    const renderBtnsRight = () => {
        const result = lastData.map((item, index) => {
            return (
                <div
                    className={cx('controls_item')}
                    key={index}
                    onMouseOver={() => {
                        if (item.type === 'vol') {
                            setStyles(true);
                        }
                    }}
                    onMouseLeave={() => {
                        if (item.type === 'vol') {
                            setStyles(false);
                        }
                    }}
                >
                    <Button
                        circle_hide
                        Icons={item.icon}
                        disable={item.disable}
                        extraTitle={item.extraTitle}
                        onHandle={() => handle(item.type)}
                    />
                </div>
            );
        });
        return result;
    };

    return (
        <div className={cx('player_control_right')}>
            <div className={cx('player_controls_right_container')}>
                {renderBtnsRight()}
            </div>
            <div className={cx('player_input_vol')}>
                <InputProgress
                    classes={classes}
                    volumeType={true}
                    max={10}
                    audioRef={audioRef}
                />
            </div>
            <div className={cx('devide')}></div>
            <div className={cx('btn_playlist_queue')}>
                <Button
                    Icons={ListQueue}
                    onHandle={hnadleListQueue}
                    className={cx(isPlayerQueue ? 'queueOn' : 'queueOff')}
                />
            </div>
        </div>
    );
}

export default ControlsRight;

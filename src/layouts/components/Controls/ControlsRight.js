import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import { Multi, Mv, Volumn, VolumnOff } from '../../../components/Icons';
import { combinedStatusSelector } from '../../../redux/selector';
import { statusSlice } from '../../../redux/sliceReducer';
import InputProgress from '../InputProgress';
import styles from './Controls.module.scss';
const cx = classNames.bind(styles);

function ControlsRight({ audioRef }) {
    const [style, setStyles] = useState(false);
    const { isVolume } = useSelector(combinedStatusSelector);
    const dispatch = useDispatch();
    const CONTROL_BTNS_RIGHT = [
        {
            data: [
                {
                    icon: Mv,
                    disable: true,
                },

                {
                    icon: Multi,
                    extraTitle: 'Chế độ cửa sổ',
                },
                {
                    icon: isVolume ? Volumn : VolumnOff,
                    type: 'volume',
                },
            ],
        },
    ];
    const handle = (action) => {
        switch (action) {
            case 'volume':
                dispatch(statusSlice.actions.isVolumeChange(!isVolume));
                break;
            default:
                console.log('default');
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
        </div>
    );
}

export default ControlsRight;

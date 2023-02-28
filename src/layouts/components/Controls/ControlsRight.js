import styles from './Controls.module.scss';
import classNames from 'classnames/bind';
import { Mic, Multi, Mv, Volumn, VolumnOff } from '../../../components/Icons';
import InputProgress from '../InputProgress';
import Button from '../../../components/Button/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { volume } from '../../../redux/actions';
import { isVolumeSelector } from '../../../redux/selector';
const cx = classNames.bind(styles);

function ControlsRight({ audioRef }) {
    const [style, setStyles] = useState(false);
    const _isVolume = useSelector(isVolumeSelector);
    const [isVol, setIsVol] = useState(true);
    const dispatch = useDispatch();

    const CONTROL_BTNS_RIGHT = [
        {
            data: [
                {
                    icon: Mv,
                    disable: true,
                },
                {
                    icon: Mic,
                    extraTitle: 'Xem lời bài hát',
                },
                {
                    icon: Multi,
                    extraTitle: 'Chế độ cửa sổ',
                },
                {
                    icon: _isVolume ? Volumn : VolumnOff,
                    type: 'volume',
                },
            ],
        },
    ];
    const handle = (action) => {
        switch (action) {
            case 'volume':
                setIsVol(!isVol); 
                dispatch(volume(!isVol));
                break;
            default:
                console.log(3);
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

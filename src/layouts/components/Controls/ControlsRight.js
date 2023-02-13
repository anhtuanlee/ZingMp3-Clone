import styles from './Controls.module.scss';
import classNames from 'classnames/bind';
import { Mic, Multi, Mv, Volumn, VolumnOff } from '../../../components/Icons';
import InputProgress from '../InputProgress';
import Button from '../../../components/Button/Button';
import { useState } from 'react';
const cx = classNames.bind(styles);

function ControlsRight() {
    const [isVol, setIsVol] = useState(true);
    const [style, setStyles] = useState(false);
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
                    icon: isVol ? Volumn : VolumnOff,
                    type: 'vol',
                },
            ],
        },
    ];
    const handle = (action) => {
        switch (action) {
            case 'vol':
                setIsVol(!isVol);
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
                <InputProgress classes={classes} />
            </div>
        </div>
    );
}

export default ControlsRight;

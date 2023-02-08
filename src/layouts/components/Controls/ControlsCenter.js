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
import { useState } from 'react';
import InputProgress from '../InputProgress';

const cx = classNames.bind(styles);

function ControlsCenter() {
    const [isPlaying, setIsPlaying] = useState(false);

    const CONTROL_BTNS = [
        {
            data: [
                {
                    icon: Random,
                    extraTitle: 'Bật phát ngẫu nhiên',
                },
                {
                    icon: Prev,
                },
                {
                    icon: isPlaying ? Play : Pause,
                    border: true,
                    circle_hide: true,
                    type: 'play',
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
                return isPlaying ? setIsPlaying(false) : setIsPlaying(true);
                break;
            case 'next':
                console.log('next');
                break;
            default:
                console.log('default');
        }
    };

    const lastData = CONTROL_BTNS[CONTROL_BTNS.length - 1].data;

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
                        <span className={cx('time_start')}>0:00</span>
                        <div className={cx('progress_container')}>
                            <InputProgress max={100} step={1} />
                        </div>
                        <span className={cx('time_end')}>0:00 </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlsCenter;

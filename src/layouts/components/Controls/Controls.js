import React from 'react';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import AudioElement from '../AudioElement';
import styles from './Controls.module.scss';
import ControlsCenter from './ControlsCenter';
import ControlsLeft from './ControlsLeft';
import ControlsRight from './ControlsRight';
import Media from 'react-media'; 

const cx = classNames.bind(styles);
function Controls() {
    const audioRef = useRef();
    return (
        <Media query="(max-width:900px)">
            {(matches) => {
                return matches ? (
                    <div className={cx('wrapper')}>
                        <AudioElement ref={audioRef} />
                        <ControlsLeft />
                        <ControlsCenter audioRef={audioRef} />
                        <ControlsRight audioRef={audioRef} isTablet />
                    </div>
                ) : (
                    <div className={cx('wrapper')}>
                        <AudioElement ref={audioRef} />
                        <ControlsLeft />
                        <ControlsCenter audioRef={audioRef} />
                        <ControlsRight audioRef={audioRef} />
                    </div>
                );
            }}
        </Media>
    );
}

export default Controls;

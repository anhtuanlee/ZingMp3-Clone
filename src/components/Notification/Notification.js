import classNames from 'classnames/bind';
import { useState } from 'react';
import { Check, Close, Error, Info } from '../Icons';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function Notification({ title, styles }) {
  const [isTurnOff, setIsTurnOff] = useState(false);

    const handleTurnOffNotification = () => {
        setIsTurnOff(true); 
    };
    const Icon = () => {
        if (styles === 'success') {
            return <Check />;
        }
        if (styles === 'error' || styles === 'warning') {
            return <Error />;
        }
        if (styles === 'info') {
            return <Info />;
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', styles, isTurnOff ? 'off' : 'on')}>
                <div className={cx('icon_notification')}>
                    <Icon />
                </div>
                <div className={cx('title_notification')}>
                    <span>{title} </span>
                    <span className={cx('btn_close')} onClick={handleTurnOffNotification}>
                        <Close />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Notification;

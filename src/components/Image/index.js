import images from '../../assets';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Images({ src, icon, imgError, alt, ...props }) {
    const [defaultImg, setDefaultImg] = useState('');
    const userDefault = images.usersDefault;

    const handleErrorImg = () => {
        setDefaultImg(imgError || userDefault);
    };
    const classes = cx('wrapper', { icon });
    return (
        <img
            className={classes}
            alt={alt}
            src={defaultImg || src}
            {...props}
            onError={handleErrorImg}
        />
    );
}

export default Images;

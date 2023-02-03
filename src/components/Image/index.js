import images from '../../assets';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
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
Images.propTypes = {
    src: PropTypes.string,
    icon: PropTypes.bool,
    imgError: PropTypes.string,
    alt: PropTypes.string,
};
export default Images;

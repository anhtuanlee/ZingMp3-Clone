import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import images from '../../assets';
import styles from './Image.module.scss';
import { combinedStatusSelector } from '../../redux/selector';
import Loading from '../../pages/Loading/Loading';

const cx = classNames.bind(styles);

function Images({
    src,
    Icon,
    IconBtn,
    onHandle,
    imgError,
    isControl, // just change in control,
    isMobile,
    alt,
    type,
    ...props
}) {
    const [defaultImg, setDefaultImg] = useState('');
    const { isLoading } = useSelector(combinedStatusSelector);
    const userDefault = images.usersDefault;

    const handleErrorImg = () => {
        setDefaultImg(imgError || userDefault);
    };

    const classes = cx('wrapper', type, { Icon });
    return isLoading && isControl ? (
        <Loading
            styles={{
                width: isMobile ? '40px' : '64px',
                height: isMobile ? '40px' : '64px',
            }}
        />
    ) : !IconBtn ? (
        <img
            className={classes}
            onClick={onHandle}
            alt={alt}
            src={src ? src : defaultImg}
            {...props}
            onError={handleErrorImg}
        />
    ) : (
        <div className={cx('btn_arrow_right')}>
            <IconBtn />
        </div>
    );
}
Images.propTypes = {
    src: PropTypes.string,
    Icon: PropTypes.bool,
    imgError: PropTypes.string,
    alt: PropTypes.string,
    IconBtn: PropTypes.node,
    onHandle: PropTypes.func,
    isControl: PropTypes.bool,
    isMobile: PropTypes.bool,
    type: PropTypes.string,
};
export default Images;

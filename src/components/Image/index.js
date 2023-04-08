import images from '../../assets';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../redux/selector';
import Loading from '../../pages/Loading/Loading';
const cx = classNames.bind(styles);
function Images({
    src,
    Icon,
    IconBtn,
    stylesIcon,
    imgError,
    isControl, // just change in control
    alt,
    type,
    ...props
}) {
    const [defaultImg, setDefaultImg] = useState('');
    const userDefault = images.usersDefault;
    const { isLoading } = useSelector(combinedStatusSelector);
    const handleErrorImg = () => {
        setDefaultImg(imgError || userDefault);
    };
    const classes = cx('wrapper', type, { Icon });
    return isLoading && isControl ? (
        <Loading styles={{ width: '64px', height: '64px' }} />
    ) : !IconBtn ? (
        <img
            className={classes}
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
};
export default Images;

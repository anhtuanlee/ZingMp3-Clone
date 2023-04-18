import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Images from '../../components/Image';
import { convertNumber } from '../../hooks/';
import styles from './AccountPropose.module.scss';

const cx = classNames.bind(styles);

function AccountPropose({ data = [], onHandle }) {
    // random image of
    const result = Array.isArray(data) && data[data.length - 1];
    // fix word not synce
    const datacate = result.category.split(' ');

    const category = datacate.map((item) => {
        const result = item.charAt(0).toUpperCase() + item.slice(1) + ' ';
        return result;
    });
    const favorite = convertNumber(result.favorite);
    //favorite
    const imgs = result.image_music;
    const imgError = 'https://placehold.jp/3d4070/ffffff/150x150.png?text=No_Image';

    return (
        <Link className={cx('wrapper')} to={`/${result.slug_name_singer}`}>
            <div className={cx('user_account')} onClick={onHandle}>
                <Images
                    className={cx('avatar')}
                    src={imgs}
                    imgError={imgError}
                    alt={result.slug_name_music}
                />
                <div className={cx('user_info')}>
                    <div className={cx('name_singer')}>{result.name_singer}</div>
                    <div className={cx('sub_title')}>
                        {category}•{' '}
                        <span className={cx('follower')}>{favorite} quan tâm</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
AccountPropose.propTypes = {
    data: PropTypes.array,
    onHandle: PropTypes.func,
};
export default AccountPropose;

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Images from '../../components/Image';
import styles from './Propose.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);
function AccountPropose({ data = [], random = 0 }) {
    // random image of singer
    const result = data[random];

    // fix word not synce
    const datacate = result.category.split(' ');
    const category = datacate.map((item) => {
        const result = item.charAt(0).toUpperCase() + item.slice(1) + ' ';
        return result;
    });

    //favorite
    const favorite = Math.floor(
        result.favorite / 1000 > 1000
            ? result.favorite / 1000000
            : result.favorite / 1000,
    );

    const imgs = result.image_music;
    const imgError =
        'https://placehold.jp/3d4070/ffffff/150x150.png?text=No_Image';

    return (
        <Link className={cx('wrapper')} to={`/${result.slug_name_singer}`}>
            <div className={cx('user_account')}>
                <Images
                    className={cx('avatar')}
                    src={imgs}
                    imgError={imgError}
                    alt={result.slug_name_music}
                />
                <div className={cx('user_info')}>
                    <div className={cx('name_singer')}>
                        {result.name_singer}
                    </div>
                    <div className={cx('sub_title')}>
                        {category}
                        <FontAwesomeIcon
                            icon={faCircle}
                            className={cx('icon_dot')}
                        />
                        <span className={cx('follower')}>
                            {`${favorite}${favorite < 10 ? 'M' : 'K'} quan tâm`}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
AccountPropose.propTypes = {
    data: PropTypes.array,
    random: PropTypes.number,
};
export default AccountPropose;

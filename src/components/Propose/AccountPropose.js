import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Images from '../../components/Image';
import { dataSongs, playMusic } from '../../redux/actions';
import { getSingerData } from '../../services';
import styles from './Propose.module.scss';
const cx = classNames.bind(styles);

function AccountPropose({ data = [], onHandle }) {
    const dispatch = useDispatch();
    const [singerData, setSingerData] = useState([]);
    //custom loading when loading data

    // random image of
    const result = data[0];
    // fix word not synce
    const datacate = result.category.split(' ');
    const category = datacate.map((item) => {
        const result = item.charAt(0).toUpperCase() + item.slice(1) + ' ';
        return result;
    });

    //favorite
    const favorite = result.favorite / 1000;
    const imgs = result.image_music;
    const imgError =
        'https://placehold.jp/3d4070/ffffff/150x150.png?text=No_Image';

    return (
        <Link className={cx('wrapper')} to={`/${result.slug_name_singer}`} state={result.slug_name_singer}>
            <div className={cx('user_account')} onClick={onHandle}>
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
                            {`${
                                // handle custom render favorrite
                                favorite > 1000
                                    ? (favorite / 1000).toString().slice(0, 3) +
                                      'M'
                                    : favorite.toString().slice(0, 4) + 'K'
                            } quan tâm`}
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

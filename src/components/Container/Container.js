import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Container.module.scss';
import PropTypes from 'prop-types';

import { Banner } from '../Banner';
import Loading from '../../pages/Loading';
import { combinedStatusSelector } from '../../redux/selector';

const cx = classNames.bind(styles);
function Container({ listData, titleSection, isPodcast }) {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    const RenderBanner = () => {
        const check = listData.map((item, index) => {
            return (
                <div className={cx('item')} key={index}>
                    <Banner item={item} index={index} isPodcast={isPodcast} />
                </div>
            );
        });
        return check;
    };
    return (
        <div className={cx('wrapper')}>
            {isLoadingPage && (
                <Loading styles={{ width: '20%', height: '5vh', margin: '20px 0' }} />
            )}
            {!isLoadingPage && <h2 className={cx('title_section')}>{titleSection}</h2>}
            <div className={cx('container_singer_popular')}>
                <RenderBanner />
            </div>
        </div>
    );
}

export default Container;

Container.propTypes = {
    listData: PropTypes.array,
    titleSection: PropTypes.string,
    isPodcast: PropTypes.bool,
};

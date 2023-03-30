import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../pages/Loading';
import { combinedStatusSelector } from '../../redux/selector';
import { Banner } from '../Banner';
import styles from './Container.module.scss';

const cx = classNames.bind(styles);
function Container({ listData, titleSection, isBannerAlbumHot }) {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    const render = (listData) => {
        const check = listData.map((item, index) => {
            return (
                <div className={cx('item')} key={index}>
                    <Banner
                        item={item}
                        index={index}
                        isBannerAlbumHot={isBannerAlbumHot}
                    />
                </div>
            );
        });
        return check;
    };
    return (
        <div className={cx('wrapper')}>
            {isLoadingPage && <Loading styles={{ width: '20%', height: '5vh' , margin: '20px 0'}} />}
            {!isLoadingPage && <h2 className={cx('title_section')}>{titleSection}</h2>}
            <div className={cx('container_singer_popular')}>{render(listData)}</div>
        </div>
    );
}

export default Container;

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { BANNER_SINGER_POPULAR } from '../../../redux/constant';
import Banner from '../../Banner/Banner';
import styles from './SingerPopular.module.scss';
const cx = classNames.bind(styles);
function SingerPopular() {
    const render = () => {
        const result = BANNER_SINGER_POPULAR.map((item, index) => {
            return (
                <div className={cx('item')} key={index}>
                    <Link
                        to={`album/${item.slug_name_singer}`}
                        state={{
                            src: item.src,
                            title: item.title,
                            slug_name_singer: item.slug_name_singer,
                        }}
                    >
                        <div className={cx('item_banner')}>
                            <Banner item={item} index={index} />
                        </div>
                    </Link>

                    <Link
                        to={`album/${item.slug_name_singer}`}
                        state={{
                            src: item.src,
                            title: item.title,
                            slug_name_singer: item.slug_name_singer,
                        }}
                    >
                        <h3 className={cx('item_title')}>{item.title}</h3>
                    </Link>
                    <Link to={`/${item.slug_name_singer}`}>
                        <span className={cx('item_extra_title')}>
                            {item.name_singer}
                        </span>
                    </Link>
                </div>
            );
        });
        return result;
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title_section')}>Nghệ Sĩ Thịnh Hành</h2>
            <div className={cx('container_singer_popular')}>{render()}</div>
        </div>
    );
}

export default SingerPopular;

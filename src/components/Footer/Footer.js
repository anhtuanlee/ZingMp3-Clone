import classNames from 'classnames/bind';
import { ImgFooter } from '../../assets/images/Footer';
import Images from '../Image';
import styles from './Footer.module.scss';
import { useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../redux/selector';
import Loading from '../../pages/Loading/Loading';
const cx = classNames.bind(styles);
function Footer() {
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    const renderPartner = () => {
        const result = ImgFooter.map((img, index) => {
            return isLoadingPage ? (
                <Loading key={index} styles={{ height: '8vh', maxWidth: '10vw' }} />
            ) : (
                <figure className={cx('item_partner')} key={index}>
                    <Images type={cx('img_partner')} src={img} />
                </figure>
            );
        });
        return result;
    };
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title_footer')}>ĐỐI TÁC ÂM NHẠC</h3>
            <div className={cx('container')}>{renderPartner()}</div>
        </div>
    );
}

export default Footer;

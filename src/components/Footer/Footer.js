import classNames from 'classnames/bind';
import { ImgFooter } from '../../assets/images/Footer';
import Images from '../Image';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);
function Footer() {
    const renderPartner = () => {
        const result = ImgFooter.map((img, index) => {
            return (
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

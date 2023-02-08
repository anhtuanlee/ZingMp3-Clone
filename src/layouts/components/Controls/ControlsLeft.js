import styles from './Controls.module.scss';
import classNames from 'classnames/bind';
import Images from '../../../components/Image';
import Button from '../../../components/Button';
import { Heart, More } from '../../../components/Icons';
const cx = classNames.bind(styles);

function ControlsLeft() {
    return (
        <div className={cx('player_control_left')}>
            <div className={cx('media_Images')}>
                <figure className={cx('item_img')}>
                    <Images src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg" />
                </figure>
            </div>
            <div className={cx('media_content')}>
                <span className={cx('item_title')}>Người Như Anh</span>
                <h3 className={cx('item_subtitle')}>Mai Tiến Dũng</h3>
            </div>
            <div className={cx('media_custom')}>
                <Button Icons={Heart} circle_hide extraTitle='favorite'/>

                <Button Icons={More} circle_hide />
            </div>
        </div>
    );
}

export default ControlsLeft;

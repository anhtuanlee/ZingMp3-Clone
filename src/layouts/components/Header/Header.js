import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {
    ButtonTheme,
    DowloadIcon,
    Setting,
    VIP,
} from '../../../components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Search from '../../../components/Search';
import Button from '../../../components/Button/Button';
import Image from '../../../components/Image';
import Menu from '../Menu';
const cx = classNames.bind(styles);
function Header() {

    const MENU_USER = [
        {
            
        }
    ]

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('button_controls_left')}>
                    <div>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={cx('icon-arrow-prev')}
                        />
                    </div>
                    <div>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={cx('icon-arrow-next')}
                        />
                    </div>
                    <Search />
                </div>
                <div className={cx('button_controls_right')}>
                    <Button primary LeftIcons={DowloadIcon} sizes="normal">
                        Dowload
                    </Button>
                    <Button circle  Icons={ButtonTheme} />

                    <Button circle Icons={VIP} />
                    <Button circle Icons={Setting} />

                    <Menu  >
                        <Image
                            className={cx('avatar')}
                            src="https://2.bp.blogspot.com/-gnXUMwRHkaI/WE1VCAktNhI/AAAAAAAAjfs/CZk6jUipKXgvOKc821Rnz-fwXT0QhLEuACEw/s1600/15085502_591915637681021_5420424684372040797_n.jpg"
                        />
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

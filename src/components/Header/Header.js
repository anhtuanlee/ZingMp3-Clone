import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { ButtonTheme } from '../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('button_controls_left')}>
                    <div>
                        <FontAwesomeIcon icon={faArrowLeft} className={cx('icon-arrow-prev')} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faArrowRight} className={cx('icon-arrow-next')} />
                    </div>
                </div>
                <Search/>
            </div>
        </header>
    );
}

export default Header;

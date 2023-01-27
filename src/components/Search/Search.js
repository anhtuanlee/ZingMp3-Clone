import { faSearch, faXmark } from '@cseitz/fontawesome-svg-light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import AccountPropose from '../Propose/AccountPropose';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search_input')}>
                <FontAwesomeIcon icon={faSearch} className={cx('button_search')} />
                <input placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." /> 
                <FontAwesomeIcon icon={faXmark}  className={cx('button_close')}/>
            </div>
            <div className={cx('result_search')}>
                <AccountPropose />
                <AccountPropose /> 
                <AccountPropose />
                <AccountPropose />  
                <AccountPropose />
                <AccountPropose />
                <AccountPropose />
            </div>
        </div>
    );
}

export default Search;

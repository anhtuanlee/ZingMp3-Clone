import { faSearch, faXmark } from '@cseitz/fontawesome-svg-light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import AccountPropose from '../Propose/AccountPropose';
import Tippy from '@tippyjs/react/headless';
import MusicPropose from '../Propose/MusicPropose';

const cx = classNames.bind(styles);

function Search() {
    return (
        <Tippy
            interactive
            visible={false}
            offset={[0, 0]}
            render={(attrs) => {
                return (
                    <div
                        className={cx('result_search')}
                        {...attrs}
                        tabIndex="-1"
                    >
                        <AccountPropose />
                        <MusicPropose />
                        <MusicPropose />
                        <MusicPropose />
                    </div>
                );
            }}
        >
            <div className={cx('wrapper')}>
                <div className={cx('search_input')}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={cx('button_search')}
                    />
                    <input placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." />
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={cx('button_close')}
                    />
                </div>
            </div>
        </Tippy>
    );
}

export default Search;

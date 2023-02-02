import { faSearch, faXmark } from '@cseitz/fontawesome-svg-light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';

import Tippy from '@tippyjs/react/headless';
import useDebounce from '../../hooks';
import { SearchApi } from '../../services';
import { MusicPropose, AccountPropose } from '../Propose';
const cx = classNames.bind(styles);

function Search() {
    const [value, setValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [visible, setVisible] = useState(false);
    const debounce = useDebounce(value, 500);
    const inputRef = useRef();
    useEffect(() => {
        const Fetch = async () => {
            const result = await SearchApi(debounce).then((data) => {
                setSearchResult(data);
            });
            return result;
        };
        Fetch();
    }, [debounce]);
    if (visible === true) {
    }
    // handle Event
    const handleType = (e) => {
        setValue(e.target.value);
    };
    const handleFocus = () => {
        setVisible(true);
    };
    const handleMouseOut = () => {
        setVisible(false);
    };
    const handleClear = () => {
        setValue('');
        setSearchResult([]);
    };
    return (
        <Tippy
            interactive
            visible={visible}
            onClickOutside={handleMouseOut}
            offset={[0, 0]}
            render={(attrs) => {
                return (
                    <div
                        className={cx('result_search')}
                        {...attrs}
                        tabIndex="-1"
                    >
                        {/* kiểm tra mảng có phần tử mới gửi dữ liệu qua Account */}
                        <h4 className={cx('result_title')}>
                            {searchResult.length > 0
                                ? 'Gợi ý kết quả'
                                : 'Nhập thông tin tìm kiếm'}
                        </h4>
                        {searchResult.length > 0 && (
                            <AccountPropose
                                data={searchResult ? searchResult : undefined}
                            />
                        )}
                        {searchResult.map((item, index) => {
                            return <MusicPropose data={item} key={index} />;
                        })}
                    </div>
                );
            }}
        >
            <div className={cx('wrapper')}>
                <div
                    className={cx(
                        'search_input',
                        visible === true ? 'isCollap' : '',
                    )}
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={cx('button_search')}
                    />
                    <input
                        value={value}
                        onFocus={handleFocus}
                        onChange={(e) => handleType(e)}
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                    />
                    {value !== '' ? <FontAwesomeIcon
                            icon={faXmark}
                            onClick={handleClear}
                            className={cx('button_close')}
                        /> : <></>}
                </div>
            </div>
        </Tippy>
    );
}

export default Search;

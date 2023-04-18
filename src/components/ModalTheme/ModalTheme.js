import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import { Close } from '../Icons';
import ModalItem from './ModalItem';
import Button from '../../components/Button';
import styles from './ModalTheme.module.scss';
import { themeSlice } from '../../redux/sliceReducer';
import { MENU_THEME_LIST } from '../../redux/constant';

const cx = classNames.bind(styles);

function ModalTheme() {
    const dispatch = useDispatch();
    const [themeTest, setThemeTest] = useState(false);

    const handleTurnOffModal = async () => {
        setThemeTest(true);
        await new Promise((rel) => setTimeout(rel, 50));
        dispatch(themeSlice.actions.setIsModalTheme(false));
    };
    const renderListTheme = () => {
        const result = MENU_THEME_LIST.artist.map((item, index) => {
            return <ModalItem item={item} key={index} themeTest={themeTest} />;
        });
        return result;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('theme_modal')}>
                <div className={cx('main_title')}>
                    <h1>Giao Diện</h1>
                    <span>
                        <Button
                            extraTitle="Đóng"
                            Icons={Close}
                            className={cx('btn_close')}
                            onHandle={handleTurnOffModal}
                        />
                    </span>
                </div>
                <div className={cx('container')}>
                    <div>
                        <h2>Nghệ Sĩ</h2>
                        <div className={cx('section_theme_list')}>
                            {renderListTheme()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTheme;

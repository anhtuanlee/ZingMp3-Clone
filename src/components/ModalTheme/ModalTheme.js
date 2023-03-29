import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { MENU_THEME_LIST } from '../../redux/constant';
import { themeSlice } from '../../redux/sliceReducer';
import { Close } from '../Icons';
import ModalItem from './ModalItem';
import styles from './ModalTheme.module.scss';
const cx = classNames.bind(styles);

function ModalTheme() {
    const dispatch = useDispatch();
    const [themeTest, setThemeTest] = useState(false);

    const handleTurnOffModal = () => {
        setThemeTest(true);
        setTimeout(() => {
            dispatch(themeSlice.actions.setIsModalTheme(false));
        }, 0);
    };

  
    const handleStop = (e) => {};
    const renderListTheme = () => {
        const result = MENU_THEME_LIST.artist.map((item, index) => {
            return <ModalItem item={item} key={index} themeTest={themeTest} />;
        });
        return result;
    };

    return (
        <div className={cx('wrapper')} /*  onClick={handleTurnOffModal} */>
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
                        <div
                            className={cx('section_theme_list')}
                            onClick={(e) => handleStop}
                        >
                            {renderListTheme()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTheme;

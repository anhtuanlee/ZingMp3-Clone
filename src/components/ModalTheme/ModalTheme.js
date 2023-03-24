import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../redux/selector';
import { themeSlice } from '../../redux/sliceReducer';
import styles from './ModalTheme.module.scss';

const cx = classNames.bind(styles);

function ModalTheme() {
    const dispatch = useDispatch();
    const { isTheme } = useSelector(combinedStatusSelector);
    const handleTurnOffModal = () => {
        dispatch(themeSlice.actions.setIsModalTheme(false));
    };

    console.log(isTheme);
    return <div className={cx('wrapper')} onClick={handleTurnOffModal}></div>;
}

export default ModalTheme;

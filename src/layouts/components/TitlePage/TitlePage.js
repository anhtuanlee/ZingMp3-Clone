import classNames from 'classnames/bind';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import ButtonEffectPlay from '../../../components/Button/config/ButtonEffectPlay';
import Loading from '../../../pages/Loading';
import { combinedStatusSelector } from '../../../redux/selector';
import styles from './TitlePage.module.scss';

const cx = classNames.bind(styles);
const TitlePage = memo(({ title, sizes, styles, data }) => {
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    
    return isLoadingPage ? (
        <header className={cx('header_title')} style={styles}>
            <Loading styles={{ width: '30%', height: '4vh' }} />
        </header>
    ) : (
        <header className={cx('header_title')} style={styles}>
            <h3>{title}</h3>
            {sizes && <ButtonEffectPlay sizes={sizes} data={data} />}
        </header>
    );
});

export default TitlePage;

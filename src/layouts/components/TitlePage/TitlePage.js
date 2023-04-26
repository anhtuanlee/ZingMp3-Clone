import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './TitlePage.module.scss';
import Loading from '../../../pages/Loading';
import { combinedStatusSelector } from '../../../redux/selector';
import ButtonEffectPlay from '../../../components/Button/config/ButtonEffectPlay';

const cx = classNames.bind(styles);
const TitlePage = memo(({ title, sizes, styles, data, className }) => {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    return isLoadingPage ? (
        <header className={cx('header_title')} style={styles}>
            <Loading styles={{ width: '30%', height: '4vh' }} />
        </header>
    ) : (
        <header className={cx('header_title', className)} style={styles}>
            <h3 className={cx('title_section')}>{title}</h3>
            {data && <ButtonEffectPlay sizes={sizes} data={data} />}
        </header>
    );
});

export default TitlePage;

TitlePage.propTypes = {
    title: PropTypes.string,
    sizes: PropTypes.string,
    styles: PropTypes.object,
    data: PropTypes.array,
    className: PropTypes.string,
};

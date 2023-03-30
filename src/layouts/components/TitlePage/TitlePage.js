import { ButtonEffectPlay } from '../../../components/Button';
import classNames from 'classnames/bind';
import styles from './TitlePage.module.scss';
import { useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../../redux/selector';
import Loading from '../../../pages/Loading';

const cx = classNames.bind(styles);
function TitlePage({ title, sizes = 'large', styles,data}) {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    return isLoadingPage ? (
        <header className={cx('header_title')} style={styles}>
            <Loading styles={{ width: '40%', height: '8vh' }} />
        </header>
    ) : (
        <header className={cx('header_title')} style={styles}>
            <h3>{title}</h3>
            <ButtonEffectPlay sizes={sizes} data={data} />
        </header>
    );
}

export default TitlePage;

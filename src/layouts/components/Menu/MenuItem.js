import classNames from 'classnames/bind';
import Button from '../../../components/Button/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data,onClick }) {
    const classes = cx('items', {
        spederate: data.spederate,
        textblur: data.textblur,
    });
    return (
        <li className={classes}>
            <Button LeftIcons={data.icon} className={cx('icon')} to={data.to} onClick={onClick}>
                <span className={cx('item_title')}>{data.title}</span>
            </Button>
        </li>
    );
}

export default MenuItem;

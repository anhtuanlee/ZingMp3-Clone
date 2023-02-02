import classNames from 'classnames/bind';
import Button from '../../../components/Button/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onHandle }) {
    const classes = cx('items', {
        spederate: data.spederate,
        textblur: data.textblur,
    });
    return (
        <div className={classes}>
            <Button
                text
                LeftIcons={data.icon}
                className={cx('icon')}
                to={data.to}
                onHandle={() => onHandle(data)}
                href={data.href}
                title={data.title}
                nestest={data.children}
            >
                <span className={cx('item_title')}>{data.title}</span>
            </Button>
        </div>
    );
}

export default MenuItem;

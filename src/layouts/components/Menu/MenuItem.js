import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Button from '../../../components/Button/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onHandle, song }) { 
    
    const classes = cx('items', {
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
                spederate={data.spederate}
            >
                <span className={cx('item_title')}>{data.title}</span>
            </Button>
        </div>
    );
}
MenuItem.propTypes = {
    data: PropTypes.object,
    onHandle: PropTypes.func,
};
export default MenuItem;

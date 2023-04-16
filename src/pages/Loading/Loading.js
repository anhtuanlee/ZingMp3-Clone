import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);
function Loading({ children, styles, className }) {
    return (
        <div className={cx('skeleton', className)} style={styles}>
            {children}
        </div>
    );
}

export default Loading;

Loading.propTypes = {
    styles: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
};

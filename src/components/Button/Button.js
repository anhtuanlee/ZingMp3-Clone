import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Button({
    // type
    circle,
    primary,
    text,
    //sizes
    sizes,
    // Icons,
    Icons,
    LeftIcons,
    RightIcons,
    //element
    href,
    to,
    children,
    ...passProps
}) {
    const classnames = cx('wrapper', { primary, circle, text }, sizes);
    const Comp = 'button';
    const props = { ...passProps };
    if (href) {
        props.href = href;
        Comp = 'a';
    } else if (to) {
        props.to = to;
        Comp = Link;
    }
    return (
        <Comp className={classnames} {...props}>
            <span className={cx('left_icon')}>
                {LeftIcons && <LeftIcons />}
            </span>
            {Icons && <Icons />}
            {children}

            <span className={cx('right_icon')}>
                {RightIcons && <RightIcons />}
            </span>
        </Comp>
    );
}

export default Button;

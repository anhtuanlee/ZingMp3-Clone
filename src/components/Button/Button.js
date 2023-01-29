import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    onClick,
    // type
    circle,
    primary,
    text,
    //sizes
    sizes,
    // Icons,
    Icons,
    LeftIcons,
    RightIcons = false,
    //element
    href = false,
    to = false,
    children,
    //css ,
    className,
    ...passProps
}) {
    const classnames = cx(
        'wrapper',
        { primary, circle, text },
        sizes,
        className,
    );
    let Comp = 'button';
    const props = { ...passProps };
    if (href) {
        Comp = 'a';
        props.href = href;
    } else if (to) {
        Comp = Link;
        props.to = to;
    }
    return (
        <Comp className={classnames} {...props} onClick={onClick}>
            {LeftIcons && (
                <span className={cx('left_icon')}>
                    <LeftIcons />
                </span>
            )}
            {Icons && <Icons className={cx('main_icon')} />}
            <span>{children}</span>
            {RightIcons && (
                <span className={cx('right_icon')}>
                    <RightIcons />
                </span>
            )}
        </Comp>
    );
}

export default Button;

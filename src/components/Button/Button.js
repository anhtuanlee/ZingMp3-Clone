import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Menu from '../../layouts/components/Menu';

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
    //TippyCustom ,
    extraTitle = false,
    nestest,
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
        props.href = href;
        Comp = 'a';
    } else if (to) {
        props.to = to;
        Comp = Link;
    } 
    {
        return extraTitle ? (
            <Tippy duration={[100, 0]} content={extraTitle} >
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
            </Tippy>
        ) : (
           /*  <Menu items={nestest}> */
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
           /*  </Menu> */
        );
    }
}

export default Button;

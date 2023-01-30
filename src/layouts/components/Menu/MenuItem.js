import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import Menu from './Menu';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick, nestest }) { 
    const classes = cx('items', {
        spederate: data.spederate,
        textblur: data.textblur,
    });
     return (
        <li className={classes}>
            <Button
                LeftIcons={data.icon}
                className={cx('icon')}
                to={data.to}
                onClick={onClick}
                href={data.href}
                title={data.title} 
                nestest={nestest}
            >
                <span className={cx('item_title')}>{data.title}</span>
            </Button>
        </li>
    );
}

export default MenuItem;

/* nestest ? (
            <Menu  
            >
                <li className={classes}>
                    <Button
                        LeftIcons={data.icon}
                        className={cx('icon')}
                        to={data.to}
                        onClick={onClick}
                        href={data.href}
                        title={data.title}
                    >
                        <span className={cx('item_title')}>{data.title}</span>
                    </Button>
                </li>
            </Menu>
        ) : (
            <li className={classes}>
                <Button
                    LeftIcons={data.icon}
                    className={cx('icon')}
                    to={data.to}
                    onClick={onClick}
                    href={data.href}
                    title={data.title}
                >
                    <span className={cx('item_title')}>{data.title}</span>
                </Button>
            </li>
        );
    }; */

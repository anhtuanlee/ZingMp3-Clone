import classNames from 'classnames/bind';
import styles from './Propose.module.scss';

const cx = classNames.bind(styles);
function AccountPropose({ children }) {
    return (

        
        <div className={cx('wrapper')}>
            <div className={cx('user_account')}>
                <img
                    className={cx('avatar')}
                    src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                />
              <div className={cx('user_info')}>
                  <div className={cx('name_singer')}>Bé Dung</div>
                  <h3 className={cx('sub_title')}>
                      Nhạc sĩ
                  </h3>
              </div>
            </div>
            {children}
        </div>
    );
}

export default AccountPropose;

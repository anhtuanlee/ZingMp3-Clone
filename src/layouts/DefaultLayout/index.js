import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "../../layouts/components/Header";
import SideBar from "../../components/SideBar";
import Content from "../../components/Content";
import Controls from '../../components/Controls'
const cx = classNames.bind(styles);
function DefaultLayout() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidbar")}>
        <SideBar />
      </div>
      <div className={cx('main_page')}>
        <Header/>
       <div style={{marginTop : 70}}>
         <Content/>
       </div>
      </div>
      <div className={cx('control_music')}> 
            <Controls/>
      </div>
    </div>
  );
}

export default DefaultLayout;

import styles from './Sliderslick.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@cseitz/fontawesome-svg-light';

const cx = classNames.bind(styles);

function Arrow(props) {
    return (
        
            <FontAwesomeIcon
                onClick={props.onClick}
                className={`arrow  ${
                    props.left ? 'arrow--left' : 'arrow--right'
                }`}
                icon={props.left ? faChevronLeft : faChevronRight}
            />
        
    );
}
export default Arrow;

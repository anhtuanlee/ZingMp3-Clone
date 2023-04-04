import { faChevronLeft, faChevronRight } from '@cseitz/fontawesome-svg-light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 

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

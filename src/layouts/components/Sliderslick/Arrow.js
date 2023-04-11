import { faChevronLeft, faChevronRight } from '@cseitz/fontawesome-svg-light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Media from 'react-media';
function Arrow(props) {
    return (
        <Media query="(min-width:400px)">
            {(matches) => {
                return matches ? (
                    <FontAwesomeIcon
                        onClick={props.onClick}
                        className={`arrow  ${
                            props.left ? 'arrow--left' : 'arrow--right'
                        }`}
                        icon={props.left ? faChevronLeft : faChevronRight}
                    />
                ) : (
                    <></>
                );
            }}
        </Media>
    );
}
export default Arrow;

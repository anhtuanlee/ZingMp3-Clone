import Media from 'react-media';
import { ArrowChevonLeft, ArrowChevonRight } from '../../../components/Icons'; 

function Arrow(props) { 
    
    return (
        <Media query="(min-width:600px)">
            {(matches) => {
                return (
                    matches && (
                        <span
                            onClick={props.onClick}
                            className={`arrow  ${
                                props.left ? 'arrow--left' : 'arrow--right'
                            }`}
                        >
                            {props.left ? <ArrowChevonLeft /> : <ArrowChevonRight />}
                        </span>
                    )
                );
            }}
        </Media>
    );
}
export default Arrow;

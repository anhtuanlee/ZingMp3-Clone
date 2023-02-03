import './GlobalStyles.scss'; 
import PropTypes from 'prop-types';
function GlobalStyle({ children }) {
    return children;
}
GlobalStyle.propTypes = {
    children : PropTypes.node
}
export default GlobalStyle;

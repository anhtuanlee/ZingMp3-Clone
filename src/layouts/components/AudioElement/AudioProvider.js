import PropTypes from 'prop-types';
import { createContext, useRef } from 'react';

import AudioElement from './AudioElement';

export const AudioContext = createContext();
const AudioProvider = ({ children }) => {
    const audioRef = useRef(null);

    return (
        <AudioContext.Provider value={{ audioRef }}>
            {children} <AudioElement refs={audioRef} />
        </AudioContext.Provider>
    );
};
export default AudioProvider;

AudioProvider.propTypes = {
    children: PropTypes.node,
};

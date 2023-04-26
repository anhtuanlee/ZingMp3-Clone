import PropTypes from 'prop-types';
import { createContext, useRef } from 'react';

import AudioElement from './AudioElement';
import RadioElement from '../RadioElement/RadioElement';

export const AudioContext = createContext();
const AudioProvider = ({ children }) => {
    const audioRef = useRef(null);
    const radioRef = useRef(null);
    return (
        <AudioContext.Provider value={{ audioRef }}>
            {children} <AudioElement refs={audioRef} />
            <RadioElement refs={radioRef} />
        </AudioContext.Provider>
    );
};
export default AudioProvider;

AudioProvider.propTypes = {
    children: PropTypes.node,
};

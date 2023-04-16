import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './GlobalStyle';
import store from './redux/store';
import { Provider } from 'react-redux';
import AudioProvider from './layouts/components/AudioElement/AudioProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <GlobalStyle>
            <AudioProvider>
                <App />
            </AudioProvider>
        </GlobalStyle>
    </Provider>,
);

reportWebVitals();

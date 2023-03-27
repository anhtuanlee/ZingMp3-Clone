import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModalTheme from './components/ModalTheme/ModalTheme';
import Wrapper from './components/Wrapper/Wrapper';
import { DefaultLayout } from './layouts/';
import Controls from './layouts/components/Controls';
import { privateRoutes } from './routes';

function App() { 
    
    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Comp = route.component;
                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    <div>
                                        <Wrapper>
                                            <Layout>
                                                <Comp />
                                            </Layout>
                                        </Wrapper>

                                        <div className="control_music">
                                            <Controls />
                                        </div>
                                    </div>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

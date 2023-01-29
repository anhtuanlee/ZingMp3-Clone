import { privateRoutes } from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const Layout = DefaultLayout;
                        const Comp = route.component;
                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    <Layout>
                                        <Comp />
                                    </Layout>
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

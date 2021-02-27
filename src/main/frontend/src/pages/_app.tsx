import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar';
import { LanguageContext } from '../lib/language-context';

const CompletedTasks = lazy(() => import('./tasks/completed'));
const Tasks = lazy(() => import('./index'));

const App = () => (
    <LanguageContext.Provider value={navigator.language}>
        <Router>
            <Navbar />
            <main className="container py-5">
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={Tasks} />
                        <Route exact path="/tasks/completed" component={CompletedTasks} />
                    </Switch>
                </Suspense>
            </main>
        </Router>
    </LanguageContext.Provider>
);

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../loginPage';
import Default from '../default';

/**
 * App component.
 */
const App = () => (
    <div>
        <main>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route component={Default} />
            </Switch>
        </main>
    </div>
);

export default App;

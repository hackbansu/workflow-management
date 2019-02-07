import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, condition, redirectUrl, ...rest }) => (
    <Route
        {...rest}
        render={props => (condition ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: redirectUrl, state: { from: props.location } }} />
        ))
        }
    />
);

export default PrivateRoute;

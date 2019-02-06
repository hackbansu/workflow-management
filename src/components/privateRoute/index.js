import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...rest }) => {
    // Add your own authentication on the below line.
    let isLoggedIn = false;
    if (token && token !== '') {
        isLoggedIn = true;
    }

    return (
        <Route
            {...rest}
            render={props => (isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            ))
            }
        />
    );
};

export default PrivateRoute;

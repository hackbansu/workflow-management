import React from 'react';
import PropTypes from 'prop-types';

export const LoginForm = props => (
    <div>
        <form action="" method="post">
            <label>
                email:
                <input type="email" name="username" placeholder="eg. user@example.com" />
            </label>
            <label>
                password:
                <input type="password" name="password" />
            </label>
            <input type="submit" value="log in" />
        </form>
    </div>
);

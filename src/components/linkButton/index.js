import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Functional component of the loader.
 * @param {string} name - name to show on button.
 * @param {string} toUrl - url to redirect to on click.
 */
export const LinkButton = ({ name, toUrl }) => (
    <li className="nav-item">
        <Link to={toUrl} className="nav-link" href="#">
            {name}
        </Link>
    </li>
);

LinkButton.propTypes = {
    name: PropTypes.string.isRequired,
    toUrl: PropTypes.string.isRequired,
};

LinkButton.defaultProps = {};

export default LinkButton;

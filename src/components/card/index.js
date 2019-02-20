import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.scss';

/**
 * Functional component of the sidebar field.
 * @param {object} param0 - props object for the component.
 */
export const Card = ({ name, description, buttonText, buttonOnClick, imgUrl, classes, isVisible }) => {
    if (!isVisible) {
        return '';
    }
    return (
        <div className={`card float-left ${classes}`}>
            <img className="card-img-top" src={imgUrl} alt="Card thumbnail" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <span href="" onClick={buttonOnClick} className="btn btn-primary">
                    {buttonText}
                </span>
            </div>
        </div>
    );
};

Card.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    buttonOnClick: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    classes: PropTypes.string,
    isVisible: PropTypes.bool,
};

Card.defaultProps = {
    classes: '',
    isVisible: true,
};

export default Card;

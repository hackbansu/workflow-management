import React from 'react';

export default class Status extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * Function to return rendering of the component.
     */
    render() {
        return (
            <div>
                <span>Unkown Page</span>
            </div>
        );
    }
}

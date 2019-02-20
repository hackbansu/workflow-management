import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { DatetimePickerTrigger } from 'rc-datetime-picker';
import { validateDate } from 'utils/validators';
import { showToast } from 'utils/helpers/toast';


import 'rc-datetime-picker/dist/picker.css';

class DateTimeField extends React.Component {
    constructor(props) {
        super(props);
        const { givenMoment } = props;
        this.state = {
            currentMoment: givenMoment,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        const { constraintMoment } = this.props;
        const validationResponse = validateDate(value, constraintMoment);
        if (!validationResponse.isValid) {
            showToast(validationResponse.message);
            this.setState({
                currentMoment: constraintMoment,
            });
            return;
        }

        const { onChange } = this.props;
        onChange(value);
        this.setState({ currentMoment: value });
    }

    render() {
        const shortcuts = {
            Today: moment(),
            Tomorrow: moment().add(1, 'days'),
        };
        const { currentMoment } = this.state;
        return (
            <DatetimePickerTrigger shortcuts={shortcuts} moment={currentMoment} onChange={this.handleChange}>
                <input
                    type="text"
                    value={currentMoment.format('YYYY-MM-DD HH:mm')}
                    readOnly
                />
            </DatetimePickerTrigger>
        );
    }
}
DateTimeField.propTypes = {
    onChange: PropTypes.func.isRequired,
    givenMoment: PropTypes.object,
    constraintMoment: PropTypes.object.isRequired,
};
DateTimeField.defaultProps = {
    givenMoment: moment(),
};

export default DateTimeField;

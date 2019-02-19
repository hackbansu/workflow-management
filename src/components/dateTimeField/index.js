import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';

class DateTimeField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMoment: moment(),
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(moment) {
        const { onChange } = this.props;
        onChange(moment);
        this.setState({ currentMoment: moment });
    }

    render() {
        const shortcuts = {
            Today: moment(),
            Tomorrow: moment().add(1, 'days'),
        };
        const { currentMoment } = this.state;
        return (
            <DatetimePickerTrigger shortcuts={shortcuts} moment={currentMoment} onChange={this.onChange}>
                <input type="text" value={currentMoment.format('YYYY-MM-DD HH:mm')} readOnly />
            </DatetimePickerTrigger>
        );
    }
}
DateTimeField.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default DateTimeField;

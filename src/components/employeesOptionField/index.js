import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row } from 'react-bootstrap';

function createOptions(employees) {
    return Object.keys(employees).map(key => (
        <option key={`${key}-employee-key`} value={`${key}`}>
            {`${employees[key].user.firstName} ${employees[key].user.lastName}`}
        </option>
    ));
}

function employeesOptionField({ label, employees, employeeId, onChange, disabled }) {
    return (
        <Form.Group as={Col} controlId="employeeSelect">
            <Form.Label column sm={12}>
                {label}
            </Form.Label>
            <Col sm={12}>
                <Form.Control
                    disabled={disabled}
                    size="sm"
                    as="select"
                    value={employeeId}
                    onChange={e => onChange(e.target.value)}
                >
                    {createOptions(employees)}
                </Form.Control>
            </Col>
        </Form.Group>
    );
}

employeesOptionField.propTypes = {
    employees: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    employeeId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};
employeesOptionField.defaultProps = {
    disabled: false,
    employeeId: '',
};
export default employeesOptionField;

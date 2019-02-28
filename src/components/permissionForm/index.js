import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import EmployeesOptionField from 'components/employeesOptionField';
import UserConstatnts from 'constants/user.js';

class PermissionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleAccessChange = this.handleAccessChange.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    }

    handleAccessChange(value) {
        const { permissionIdentifier, employee, onChange } = this.props;
        const data = {
            employee,
            permission: value,
        };
        onChange(permissionIdentifier, data);
    }

    handleEmployeeChange(value) {
        const { permissionIdentifier, permission, onChange } = this.props;
        const data = {
            employee: value,
            permission,
        };
        onChange(permissionIdentifier, data);
    }

    render() {
        const { employees, employee, permission, permissionIdentifier, removePermission, disabled } = this.props;
        return (
            <Form.Row id={permissionIdentifier}>
                <EmployeesOptionField
                    disabled={disabled}
                    label="Employee"
                    employees={employees}
                    employeeId={employee}
                    onChange={this.handleEmployeeChange}
                />
                <Form.Group as={Col} controlId="employeePermission">
                    <Form.Label column sm={12}>
                        {'Permission'}
                    </Form.Label>
                    <Col sm={12}>
                        <Form.Control
                            disabled={disabled}
                            size="sm"
                            as="select"
                            value={permission}
                            onChange={e => this.handleAccessChange(e.target.value)}
                        >
                            <option value={UserConstatnts.PERMISSION.READ}>
                                {UserConstatnts.PERMISSION[UserConstatnts.PERMISSION.READ]}
                            </option>
                            <option value={UserConstatnts.PERMISSION.WRITE}>
                                {UserConstatnts.PERMISSION[UserConstatnts.PERMISSION.WRITE]}
                            </option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="py-4">
                    <Button disabled={disabled} variant="danger" onClick={e => removePermission(permissionIdentifier)}>
                        {'Delete'}
                    </Button>
                </Form.Group>
            </Form.Row>
        );
    }
}

PermissionForm.propTypes = {
    employees: PropTypes.object.isRequired,
    permissionIdentifier: PropTypes.string.isRequired,
    permission: PropTypes.string.isRequired,
    removePermission: PropTypes.func.isRequired,
    employee: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

PermissionForm.defaultProps = {
    disabled: false,
    employee: '',
};

export default PermissionForm;

import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import EmployeesOptionField from 'components/employeesOptionField';
import UserConstatnts from 'constants/user.js';

class PermissionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, type) {
        const { permissionIdentifier, employee, permission, onChange } = this.props;
        const data = {
            employee,
            permission,
        };

        data[type] = value;
        onChange(permissionIdentifier, data);
    }

    render() {
        const { employees, employee, permission, permissionIdentifier, removePermission } = this.props;
        return (
            <Form.Row id={permissionIdentifier}>
                <EmployeesOptionField
                    label="Employee"
                    employees={employees}
                    employeeId={employee}
                    onChange={this.handleChange}
                />
                <Form.Group as={Col} controlId="employeePermission">
                    <Form.Label column sm={12}>
                        {'Permission'}
                    </Form.Label>
                    <Col sm={12}>
                        <Form.Control
                            as="select"
                            value={permission}
                            onChange={e => this.handleChange(e.tartget.value, 'permission')}
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
                    <Button variant="danger" onClick={e => removePermission(permissionIdentifier)}>
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
    permission: PropTypes.number.isRequired,
    removePermission: PropTypes.func.isRequired,
    employee: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

PermissionForm.defaultProps = {
    employee: -1,
};

export default PermissionForm;

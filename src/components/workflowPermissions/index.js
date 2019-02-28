import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import userConstants from 'constants/user.js';
import PermissionsForm from 'components/permissionForm';
import { getRandomBorder } from 'utils/helpers';

class Permissions extends React.Component {
    constructor(props) {
        super(props);
        this.setPermission = this.setPermission.bind(this);
        this.removePermission = this.removePermission.bind(this);
        this.addPermission = this.addPermission.bind(this);
        this.createUi = this.createUi.bind(this);
    }

    setPermission(id, value) {
        const { onChange, workflowPermissions: permissions } = this.props;
        permissions[id] = value;
        onChange(permissions);
    }

    addPermission() {
        const { employees, onChange, workflowPermissions: permissions } = this.props;
        const empList = { ...employees };
        for (const permission in permissions) {
            if (Object.hasOwnProperty.call(permissions, permission)) {
                delete empList[permissions[permission].employee];
            }
        }
        const empCount = Object.keys(empList).length;
        const permissionCount = Object.keys(permissions).length;
        if (!(empCount === 0 || empCount === permissionCount)) {
            permissions[Object.keys(permissions).length] = {
                employee: Object.keys(empList)[0],
                permission: `${userConstants.PERMISSION.READ}`,
            };
            onChange(permissions);
        }
    }

    removePermission(key) {
        const { onChange, workflowPermissions: permissions } = this.props;
        delete permissions[key];
        onChange(permissions);
    }

    createUi() {
        const { employees, workflowPermissions: permissions, disabled } = this.props;
        const empoList = { ...employees };
        return Object.keys(permissions).map((permissionKey, idx) => {
            const currentEmp = permissions[permissionKey].employee;
            const permission = (
                <PermissionsForm
                    disabled={disabled}
                    employees={{ ...empoList }}
                    employee={currentEmp}
                    permissionIdentifier={permissionKey}
                    permission={permissions[permissionKey].permission}
                    removePermission={this.removePermission}
                    key={`${Math.random()}-permission`}
                    onChange={this.setPermission}
                />
            );
            delete empoList[currentEmp];
            return permission;
        });
    }

    render() {
        return (
            <div className={`border ${getRandomBorder()} p-2 mb-2 col-12`}>
                <Form.Row className="m-2">
                    <Form.Group>
                        <Button className="float-right" variant="primary" onClick={this.addPermission}>
                            {'Add Permission'}
                        </Button>
                    </Form.Group>
                </Form.Row>
                {this.createUi()}
            </div>
        );
    }
}

Permissions.propTypes = {
    employees: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    workflowPermissions: PropTypes.object,
    disabled: PropTypes.bool,
};

Permissions.defaultProps = {
    disabled: false,
    workflowPermissions: {},
};

export default Permissions;

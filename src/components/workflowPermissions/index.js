import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import userConstants from 'constants/user.js';
import PermissionsForm from 'components/permissionForm';

class Permissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions: {},
        };
        this.setPermission = this.setPermission.bind(this);
        this.removePermission = this.removePermission.bind(this);
        this.addPermission = this.addPermission.bind(this);
        this.createUi = this.createUi.bind(this);
    }

    setPermission(id, value) {
        const { onChange } = this.props;
        const { permissions } = this.state;
        permissions[id] = value;
        onChange(permissions);
    }

    addPermission() {
        const { permissions } = this.state;
        const { employees } = this.props;
        permissions[Object.keys(permissions).length] = {
            employee: employees[0],
            permission: userConstants.PERMISSION.READ,
        };
        this.setState({ permissions });
    }

    removePermission(key) {
        const { permissions } = this.state;
        permissions.splice(key, 1);
        this.setState({ permissions });
    }

    createUi() {
        const { permissions } = this.state;
        const { employees } = this.props;
        Object.keys(permissions).map((permissionKey, idx) => (
            <PermissionsForm
                employees={employees}
                employee={permissions[permissionKey].employee}
                permissionIdentifier={permissionKey}
                permission={permissions[permissionKey].permission}
                removePermission={this.removePermission}
                key={`${Math.random()}-permission`}
                onChange={this.setPermission}
            />
        ));
    }

    render() {
        const { borderColor } = this.props;
        return (
            <div className={`border ${borderColor} p-2 mb-2 col-12`}>
                <Form.Row className="m-2">
                    <Form.Group>
                        <Button className="pull-right" variant="primary" onClick={this.addPermission}>
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
    borderColor: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Permissions.defaultProps = {
    borderColor: 'border-info',
};

export default Permissions;

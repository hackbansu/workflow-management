import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

import { updateEmployeesAction } from 'actions/employees';
import { getAllEmployees } from 'services/employees';
import userConstants from 'constants/user';
import ApiConstants from 'constants/api';
import { toast } from 'react-toastify';
import { parseEmployeeData } from 'utils/helpers';

import './index.scss';

// import components
import EmployeesNavbar from 'components/employeesNavbar';
import EmployeeCard from 'components/employeeCard';

/**
 * Login page component.
 */
export class Profile extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            filteredEmployees: [],
        };
        this.filterEmployees = this.filterEmployees.bind(this);
        this.searchEmployees = this.searchEmployees.bind(this);
    }

    componentWillMount() {
        const { updateEmployees, isAdmin } = this.props;
        getAllEmployees(isAdmin);
    }

    componentWillReceiveProps(nextProps) {
        const { employees } = nextProps;
        const filteredEmployees = [];

        Object.entries(employees).forEach(employeeTypes => {
            Object.entries(employeeTypes[1]).forEach(employee => {
                filteredEmployees.push(employee[1]);
            });
        });

        this.setState({
            filteredEmployees,
        });
    }

    filterEmployees(type) {
        const { employees } = this.props;
        const filteredEmployees = [];

        switch (type) {
        case 'ACTIVE':
            Object.entries(employees.activeEmployees).forEach(employee => {
                filteredEmployees.push(employee[1]);
            });
            break;
        case 'INACTIVE':
            Object.entries(employees.inactiveEmployees).forEach(employee => {
                filteredEmployees.push(employee[1]);
            });
            break;
        case 'INVITED':
            Object.entries(employees.invitedEmployees).forEach(employee => {
                filteredEmployees.push(employee[1]);
            });
            break;
        default:
            Object.entries(employees).forEach(employeeTypes => {
                Object.entries(employeeTypes[1]).forEach(employee => {
                    filteredEmployees.push(employee[1]);
                });
            });
        }

        this.setState({
            filteredEmployees,
        });
    }

    searchEmployees(searchVal) {
        const { employees } = this.props;

        const filteredEmployees = [];

        Object.entries(employees).forEach(employeeTypes => {
            Object.entries(employeeTypes[1]).forEach(employee => {
                const employeeData = employee[1];
                let found = false;
                if (employeeData.user.firstName.toLowerCase().indexOf(searchVal) !== -1) {
                    found = true;
                } else if (employeeData.user.lastName.toLowerCase().indexOf(searchVal) !== -1) {
                    found = true;
                } else if (employeeData.user.email.toLowerCase().indexOf(searchVal) !== -1) {
                    found = true;
                } else if (employeeData.designation.toLowerCase().indexOf(searchVal) !== -1) {
                    found = true;
                }

                if (found) {
                    filteredEmployees.push(employeeData);
                }
            });
        });

        this.setState({
            filteredEmployees,
        });
    }

    extraDetails(isAdmin) {
        if (isAdmin) {
            return (
                <React.Fragment>
                    <th scope="col">EMAIL</th>
                    <th scope="col">JOIN ON</th>
                    <th scope="col">LEFT ON</th>
                </React.Fragment>
            );
        }
        return (<></>);
    }

    /**
     * function to render the component.
     */
    render() {
        const { filteredEmployees } = this.state;
        const { isAdmin } = this.props;
        return (
            <React.Fragment>
                <EmployeesNavbar isAdmin={isAdmin} onClick={this.filterEmployees} onSearch={this.searchEmployees} />
                <Container>
                    <Row>
                        {filteredEmployees.map(data => (
                            <EmployeeCard isAdmin={isAdmin} data={data} key={`${data.id}-${data.user.id}`} />
                        ))}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

Profile.propTypes = {
    updateEmployees: PropTypes.func.isRequired,
    employees: PropTypes.object,
    isAdmin: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
    employees: {},
};

const mapStateToProps = state => ({
    employees: state.employees,
    isAdmin: state.currentUser.isAdmin,
});

const mapDispatchToProps = dispatch => ({
    updateEmployees: (...args) => dispatch(updateEmployeesAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

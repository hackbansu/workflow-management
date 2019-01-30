import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateData } from '../../actions/homeActions';

// importing components
import Dummy from '../../components/dummy';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { updateData } = this.props;
        if (updateData) {
            updateData();
        }
    }

    render() {
        const { data_1 } = this.props;
        return (
            <div>
                <div>
                    <Dummy data_1={data_1} />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    data_1: PropTypes.number,
    updateData: PropTypes.func,
};

Home.defaultProps = {
    data_1: 10,
    updateData: () => {},
};

const mapStateToProps = state => ({
    data_1: state.homeReducer.data_1,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        updateData,
    },
    dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

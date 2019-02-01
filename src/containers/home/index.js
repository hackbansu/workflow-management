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
        const { data1 } = this.props;
        return (
            <div>
                <div>
                    <Dummy data1={data1} />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    data1: PropTypes.number,
    updateData: PropTypes.func.isRequired,
};

Home.defaultProps = {
    data1: 10,
};

const mapStateToProps = state => ({
    data1: state.homeReducer.data1,
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

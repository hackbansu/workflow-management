import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// importing components
import LoginForm from 'components/loginForm';
import PageBanner from 'components/pageBanner';
import Toast from 'components/toast';
import Loader from 'components/loader';

// importing constants
import actions from 'constants/actions.js';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = (email, password) => {
            const { changeLoaderState } = this.props;
            const data = { username: email, password };

            changeLoaderState('visible');

            fetch('localhost:8000/auth/login', {
                // optional fetch options
                body: JSON.stringify(data), // you may send any data, encoded as you wish. shall match content-type
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                    'content-type': 'application/json',
                },
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // *manual, follow, error
                referrer: 'no-referrer', // *client, no-referrer
            })
                .then(response => {
                    // manipulate response object
                    // check status @ response.status etc.
                    console.log(response);
                    changeLoaderState('invisible');
                    if (response.status === 200) {
                        console.log('success');
                    } else {
                        console.log('bad');
                    }
                    return response.json(); // parses json
                })
                .then((myJson) => {
                    // use parseed result
                    console.log(myJson);
                })
                .catch(err => {
                    changeLoaderState('invisible');
                });
        };
    }

    componentDidMount() {}

    render() {
        const { loaderClass } = this.props;
        return (
            <div>
                <PageBanner text="Login" />
                <LoginForm onSubmit={this.onSubmit} />
                <Loader loaderClass={loaderClass} />
            </div>
        );
    }
}

LoginPage.propTypes = {
    loaderClass: PropTypes.string.isRequired,
    changeLoaderState: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {};

const mapStateToProps = state => ({
    loaderClass: state.loader.class,
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch({ type: actions.CHANGE_LOADER_STATE, class: value }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

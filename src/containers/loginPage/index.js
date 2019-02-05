import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeLoaderStateAction, changeToastStateAction, updateToken } from 'actions/loginActions';

// importing components
import LoginForm from 'components/loginForm';
import PageBanner from 'components/pageBanner';
import Toast from 'components/toast';
import Loader from 'components/loader';

import './index.scss';

function onSubmit(email, password) {
    const { changeLoaderState, changeToastStateAction, updateToken } = this.props;
    const data = { email, password };

    // dispatch action to show loader
    changeLoaderState('visible');

    fetch('http://2e75f37f.ngrok.io/api/user/login/', {
        // optional fetch options
        body: JSON.stringify(data), // you may send any data, encoded as you wish. shall match content-type
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
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
            if (response.status !== 200) {
                console.log('inside');
                changeToastStateAction('visible', 'invalid credentials');
                return null;
            }

            return response.json(); // parses json
        })
        .then(myJson => {
            if (!myJson) {
                return;
            }
            // use parseed result
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$444');
            console.log(myJson);

            // dispatch action to update token
            updateToken(myJson.token);

            this.props.history.push('/home');
        })
        .catch(err => {
            changeLoaderState('invisible');
        });
}

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = onSubmit.bind(this);
    }

    componentDidMount() {}

    render() {
        const { loaderClass, toast } = this.props;
        return (
            <div className="login-page">
                <div className="container">
                    <PageBanner text="Login" />
                    <LoginForm onSubmit={this.onSubmit} />
                    <Loader loaderClass={loaderClass} />
                    <Toast toastClass={toast.class} text={toast.text} />
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    loaderClass: PropTypes.string,
    toast: PropTypes.shape({
        class: PropTypes.string,
        text: PropTypes.string,
    }),
};

LoginPage.defaultProps = {
    loaderClass: 'invisible',
    toast: {
        class: 'invisible',
        text: 'There is no text here',
    },
};

const mapStateToProps = state => ({
    loaderClass: state.loader.class,
    toast: {
        class: state.toast.class,
        text: state.toast.text,
    },
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch(changeLoaderStateAction(value)),
    changeToastStateAction: (value, text) => dispatch(changeToastStateAction(value, text)),
    updateToken: value => dispatch(updateToken(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

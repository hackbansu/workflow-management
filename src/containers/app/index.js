import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginPage from 'containers/loginPage';
import Home from 'containers/home';
import Default from 'containers/default';
import Toast from 'components/toast';

/**
 * App component.
 */
export class App extends React.Component {
    render() {
        const { toast } = this.props;

        return (
            <div>
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route component={Default} />
                    </Switch>
                    <Toast toastClass={toast.class} text={toast.text} />
                </main>
            </div>
        );
    }
}

App.propTypes = {
    toast: PropTypes.shape({
        class: PropTypes.string,
        text: PropTypes.string,
    }),
};

App.defaultProps = {
    toast: {
        class: 'invisible',
        text: 'There is no text here',
    },
};

const mapStateToProps = state => ({
    toast: {
        class: state.toast.class,
        text: state.toast.text,
    },
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

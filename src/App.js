import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = [];

        if (this.props.isAuthenticated) {
            routes = [
                <Route path="/checkout" key="checkout" component={Checkout}/>,
                <Route path="/orders" key="orders" component={Orders}/>,
                <Route path="/logout" key="logout" component={Logout}/>
            ];
        }

        return (
            <div>
                <Layout>
                    <Switch>
                        {routes}
                        <Route path="/auth" key="auth" component={Auth}/>
                        <Route path="/" exact component={BurgerBuilder}/>
                        <Redirect to="/"/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

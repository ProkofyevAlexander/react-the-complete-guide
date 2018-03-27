import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = [];

        if (this.props.isAuthenticated) {
            routes = [
                <Route path="/checkout" key="checkout" component={asyncCheckout}/>,
                <Route path="/orders" key="orders" component={asyncOrders}/>,
                <Route path="/logout" key="logout" component={Logout}/>
            ];
        }

        return (
            <div>
                <Layout>
                    <Switch>
                        {routes}
                        <Route path="/auth" key="auth" component={asyncAuth}/>
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

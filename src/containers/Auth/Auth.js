import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler = (event, controlName) => {
        const inputConfig = this.state.controls[controlName];
        const value = event.target.value;
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: value,
                valid: checkValidity(value, inputConfig.validation),
                touched: true
            }
        };

        // let formIsValid = true;
        // Object.keys(updatedControls).forEach((key) => {
        //     formIsValid = formIsValid && (
        //         !updatedControls[key].validation || updatedControls[key].valid
        //     );
        // });

        this.setState({
            controls: updatedControls,
            // formIsValid: formIsValid
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        )
    };

    switchAuthModeHandler = () => {
        this.setState((previousState) => ({isSignup: !previousState.isSignup}))
    };

    render() {
        const formElements = Object.keys(this.state.controls)
            .map((key) => ({
                id: key,
                config: this.state.controls[key]
            }));

        const from = this.props.loading
            ? <Spinner/>
            : formElements.map((formElement) => (
                <Input
                    key={formElement.id}
                    {...formElement.config}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ));

        const errorMessage = this.props.error
            ? (
                <p>{this.props.error.message}</p>
            )
            : null;

        const authRedirect = this.props.isAuthenticated
            ? <Redirect to={this.props.authRedirectPath}/>
            : null;

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {from}
                    <Button btnType="Success">
                        SUBMIT
                    </Button>
                </form>
                <Button btnType="Danger"
                        clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = (dispatch) => ({
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

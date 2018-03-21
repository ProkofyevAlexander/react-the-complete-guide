import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

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
        }
    };

    checkValidity(value, rules) {

        if (!rules) {
            return true;
        }

        let isValid = true;

        value = value.trim();

        if (isValid && rules.required) {
            isValid = value !== '';
        }

        if (isValid && rules.minLength) {
            isValid = value.length >= rules.minLength;
        }

        if (isValid && rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }

        if (isValid && rules.isEmail) {
            isValid = /.+@.+\..+/.test(value);
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const inputConfig = this.state.controls[controlName];
        const value = event.target.value;
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: value,
                valid: this.checkValidity(value, inputConfig.validation),
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
            this.state.controls.password.value
        )
    };

    render() {
        const formElements = Object.keys(this.state.controls)
            .map((key) => ({
                id: key,
                config: this.state.controls[key]
            }));

        const from = formElements.map((formElement) => (
            <Input
                key={formElement.id}
                {...formElement.config}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {from}
                    <Button btnType="Success">
                        SUBMIT
                    </Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAuth: (email, password) =>
        dispatch(actions.auth(email, password))
});

export default connect(null, mapDispatchToProps)(Auth);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest'
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        Object.keys(this.state.orderForm)
            .forEach((key) =>
                formData[key] = this.state.orderForm[key].value
            );
        const order = {
            ingredients: this.props.ingredients,
            // Need to calculate price on server
            price: this.props.price,
            orderData: formData
        };

        this.props.onOrderBurger(order, this.props.token);
    };

    inputChangedHandler = (event, inputId) => {
        const inputConfig = this.state.orderForm[inputId];
        const value = event.target.value;
        const updatedOrderForm = {
            ...this.state.orderForm,
            [inputId]: {
                ...this.state.orderForm[inputId],
                value: value,
                valid: checkValidity(value, inputConfig.validation),
                touched: true
            }
        };

        let formIsValid = true;
        Object.keys(updatedOrderForm).forEach((key) => {
            formIsValid = formIsValid && (
                !updatedOrderForm[key].validation || updatedOrderForm[key].valid
            );
        });

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    };

    render() {
        const formElements = Object.keys(this.state.orderForm)
            .map((key) => ({
                id: key,
                config: this.state.orderForm[key]
            }));
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map((formElement) => (
                    <Input
                        key={formElement.id}
                        {...formElement.config}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

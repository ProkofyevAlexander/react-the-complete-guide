import React, { Component } from 'react';
import Container from '../../hoc/Container/Conteiner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount () {
        axios.get('/ingredients.json')
            .then((response) => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(() => {
                this.setState({error: true});
            });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    updatePurchaseState(ingredients) {
        const sum = Object
            .keys(ingredients)
            .reduce(
                (currentSum, idKey) =>
                    currentSum + ingredients[idKey],
                0
            );
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        this.removeAddIngredientHandler(type, 1);
    };

    removeIngredientHandler = (type) => {
        this.removeAddIngredientHandler(type, -1);
    };

    removeAddIngredientHandler = (type, factor) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + factor;
        if (updatedCount < 0) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: updatedCount
        };
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition * factor;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            // Need to calculate price on server
            price: this.state.totalPrice.toFixed(2),
            // Dummy data for test
            customer: {
                name: 'Test User',
                address: {
                    street: 'Test street 1',
                    zipCode: '123456',
                    country: 'Russia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then((/*response*/) => {
                this.setState({loading: false, purchasing: false});
            })
            .catch((/*error*/) => {
                this.setState({loading: false, purchasing: false});
            });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error
            ? <p>Ingredients can't be loaded!</p>
            : <Spinner/>;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;

            burger = (
                <Container>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Container>
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Container>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Container>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
import React, { Component } from 'react';
import Container from '../../hoc/Conteiner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
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

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Container>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}/>
            </Container>
        );
    }
}

export default BurgerBuilder;
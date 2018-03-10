import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../../hoc/Container/Conteiner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    // componentDidMount () {
    //     axios.get('/ingredients.json')
    //         .then((response) => {
    //             this.setState({
    //                 ingredients: response.data
    //             })
    //         })
    //         .catch(() => {
    //             this.setState({error: true});
    //         });
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    get purchasable() {
        const sum = Object
            .keys(this.props.ingredients)
            .reduce(
                (currentSum, idKey) =>
                    currentSum + this.props.ingredients[idKey],
                0
            );
        return sum > 0;
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error
            ? <p>Ingredients can't be loaded!</p>
            : <Spinner/>;

        if (this.props.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;

            burger = (
                <Container>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        price={this.props.totalPrice}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.purchasable}
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

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
});

const mapDispatchToProps = (dispatch) => ({
    onIngredientAdded: (ingredientName) => dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }),
    onIngredientRemoved: (ingredientName) => dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(BurgerBuilder, axios)
);
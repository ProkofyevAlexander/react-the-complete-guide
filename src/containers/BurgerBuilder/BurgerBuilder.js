import React, { Component } from 'react';
import Container from '../../hoc/Conteiner';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    };

    render() {
        return (
            <Container>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Container>
        );
    }
}

export default BurgerBuilder;
import React, { Component } from 'react';
import Container from '../../hoc/Conteiner';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
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
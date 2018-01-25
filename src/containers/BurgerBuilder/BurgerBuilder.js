import React, {Component} from 'react';
import Container from '../../hoc/Conteiner';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return (
            <Container>
                <Burger/>
                <div>Build Controls</div>
            </Container>
        );
    }
}

export default BurgerBuilder;
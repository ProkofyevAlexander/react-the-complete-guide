import React, {Component} from 'react';

import Container from '../../hoc/Conteiner';

class BurgerBuilder extends Component {
    render() {
        return (
            <Container>
                <div>Burger</div>
                <div>Build Controls</div>
            </Container>
        );
    }
}

export default BurgerBuilder;
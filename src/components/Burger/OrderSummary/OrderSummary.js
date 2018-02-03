import React from 'react';
import Container from '../../../hoc/Conteiner';
import Button from '../../../components/UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((idKey) => {
            return (
                <li key={idKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {idKey}
                    </span>:
                    {props.ingredients[idKey]}
                </li>
            );
        });
    return (
        <Container>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.purchaseContinued}>CONTINUE</Button>
        </Container>
    );
};

export default orderSummary;

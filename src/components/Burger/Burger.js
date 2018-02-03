import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let ingredients = Object
        .keys(props.ingredients)
        .map((idKey) => {
            return [...Array(props.ingredients[idKey])]
                .map((_, i) => (
                   <BurgerIngredient key={idKey + i} type={idKey}/>
                ))
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;

import React from 'react';
import classes from './Order.css'

const Order = (props) => {

    const ingredients = [];
    for (let ingredientName in props.ings) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ings[ingredientName]
            }
        )
    }

    const ingredientOutput = ingredients.map(ing => {
        return <span key={ing.name} className={classes.Span}> {ing.name} ({ing.amount})</span>
    })

    return (
        <div className={classes.Order}>
            {props.order}
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong></p>
        </div>
    );
};

export default Order;
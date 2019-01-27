import React from 'react';
import classes from './Price.css'

const Price = (props) => {
    return (
        <div className={classes.Price}>
            Current Price: <strong>{props.price.toFixed(2)} $</strong>
        </div>
    );
};

export default Price;
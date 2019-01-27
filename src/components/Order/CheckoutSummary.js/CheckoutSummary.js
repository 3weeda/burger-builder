import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you like it!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ings={props.ings} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.cancel}
            >CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.continue}
            >CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;
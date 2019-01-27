import React from 'react';
import classes from './BuildingBlocks.css';
import BuildingBlock from './BuildingBlock/BuildingBlock';
import Price from '../Price/Price';

const BuildingBlocks = (props) => {
    const ingsArray = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},  
        {label: 'Meat', type: 'meat'}
    ]

    return (
        <div className={classes.Block}>
        <Price price={props.price}/>
            {ingsArray.map((ing,i) => {
                return <BuildingBlock
                            key={i}
                            label={ing.label}
                            add={() => props.add(ing.type)}
                            remove={() => props.remove(ing.type)}
                            disabled={props.disabled[ing.type]}
                        />
            })}
        <button
        className={classes.RemoveAll}
        onClick={props.removeall}
        disabled={!props.purchasable}
        >Clear All</button>
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.isAuth ? props.purchase : props.signUpFirst}
        >{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    );
};

export default BuildingBlocks;
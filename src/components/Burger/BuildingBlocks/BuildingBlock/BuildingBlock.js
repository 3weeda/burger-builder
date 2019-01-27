import React from 'react';
import classes from './BuildingBlock.css'

const BuildingBlock = (props) => {
    return (
        <div className={classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>
            <button 
            onClick={props.remove}
            className={classes.Less}
            disabled={props.disabled}>Less
            </button>
            <button 
            onClick={props.add} 
            className={classes.More}>More
            </button>
        </div>
    );
};

export default BuildingBlock;
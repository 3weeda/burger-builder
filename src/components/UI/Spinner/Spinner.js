import React from 'react';
import classes from './Spinner.css'

const Spinner = (props) => {
    return (
        <div className={[classes.loader, props.down ? classes.down : null].join(' ')} >Loading...</div>
    );
};

export default Spinner;
import React from 'react';
import classes from './Input.css'

const Input = (props) => {
    let element = null;
    //3shan nkhly el classes dynamic, el regular + el not valid
    const inputClasses = [classes.Element];
    //HEEEELLLLWWWWWWWWWW FASHKHHHHHHHHHH
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            element = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            element = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            element = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >{option.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default:
            element = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {element}
        </div>
    );
};

export default Input;
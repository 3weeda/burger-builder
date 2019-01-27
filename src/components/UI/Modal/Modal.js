import React from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
const Modal = (props) => {
    return (
        <Auxiliary>
            <Backdrop visible={props.visible} clicked={props.closeModal}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.visible ? '1' : '0'
                }}
                >
                {props.children}
            </div>    
        </Auxiliary>
        
    );
};

export default Modal;
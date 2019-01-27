import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from './../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let totalClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        totalClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
            <Backdrop visible={props.open} clicked={props.closed} />
            <div className={totalClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav onClick={props.closed}>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default SideDrawer;
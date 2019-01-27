import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../SideDrawer/Toggle/Toggle';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Toggle toggle={props.toggle} />
            {/* <button onClick={props.toggle}>MENU</button> */}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    );
};

export default Toolbar;
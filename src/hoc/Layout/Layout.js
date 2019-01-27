import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        visible: false
    }

    hideSideDrawerHandler = () => {
        this.setState({ visible: false })
    }

    toggleMenuHandler = (prevState) => {
        this.setState({ visible: !prevState.visible })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    toggle={this.toggleMenuHandler}
                    isAuth={this.props.isAuthenticated} />
                <SideDrawer
                    open={this.state.visible}
                    closed={this.hideSideDrawerHandler}
                    isAuth={this.props.isAuthenticated} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxiliary>

        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null //lw authenticated => True    
    }
}

export default connect(mapStateToProps)(Layout);
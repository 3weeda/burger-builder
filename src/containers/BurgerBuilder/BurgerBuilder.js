import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildingBlocks from '../../components/Burger/BuildingBlocks/BuildingBlocks';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        visible: false,
    }
    
    componentDidMount () {
        this.props.onInitIngs();
    }

    UpdatePurchasing = (ingredients) => {
        const sum = Object.keys(ingredients) //returns an array of KEYS
            .map(ing => {
                return ingredients[ing]; //returns an array of VALUES of the keys.
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
    
    signUpFirst = () => {
        this.props.history.push('/auth');
    }
    purchasingHandler = () => {
        this.setState({ visible: true });
    }
    purchasingCancelHandler = () => {
        this.setState({ visible: false });
    }
    purchasingcontinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {

        const disabledButtons = {
            ...this.props.ings
        };
        for (let key in disabledButtons) {
            // if (disabledButtons[key] <= 0) {
            //     disabledButtons[key] = true;
            // }else {
            //     disabledButtons[key] = false;
            // }
            disabledButtons[key] = disabledButtons[key] <= 0
        }

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner down />

        let orderSummary = null

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger
                        ings={this.props.ings}
                    />
                    <BuildingBlocks
                        add={this.props.onAddIngs}
                        remove={this.props.onRemoveIngs}
                        removeall={this.props.onRemoveAll}
                        disabled={disabledButtons}
                        price={this.props.price}
                        purchasable={this.UpdatePurchasing(this.props.ings)}
                        purchase={this.purchasingHandler}
                        isAuth={this.props.isAuthenticated}
                        signUpFirst={this.signUpFirst}
                    />
                </Auxiliary>
            )
            orderSummary = <OrderSummary
                ings={this.props.ings}
                cancel={this.purchasingCancelHandler}
                continue={this.purchasingcontinueHandler}
                price={this.props.price}
                visible={this.state.visible}
            />

        }

        return (
            <Auxiliary>
                <Modal
                    visible={this.state.visible}
                    closeModal={this.purchasingCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ings,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddIngs: (ingType) => dispatch(actionCreators.addIngs(ingType)),
        onRemoveIngs: (ingType) => dispatch(actionCreators.removeIngs(ingType)),
        onRemoveAll: () => dispatch({type: actionTypes.REMOVE_ALL}),
        onInitIngs: () => dispatch(actionCreators.initIngs()),
        onPurchaseInit: () => dispatch(actionCreators.purchaseInit())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
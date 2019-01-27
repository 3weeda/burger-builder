import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary.js/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirecting = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirecting}
                    <CheckoutSummary
                        ings={this.props.ings}
                        cancel={this.checkoutCancelHandler}
                        continue={this.checkoutContinueHandler}
                    />
                    {/* ELLY GY DA NESTED ROUTE AHO AHOOOOO, htban f nfs el page brdo */}
                    <Route path={this.props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ings,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);

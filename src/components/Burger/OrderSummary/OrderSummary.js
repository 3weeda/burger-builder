import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    // Can also be written in the wrapping component to this one 'Modal'
    shouldComponentUpdate(nextProps) {
        return nextProps.visible !== this.props.visible
    }

    render() {
        const ingSummary = Object.keys(this.props.ings)
            .map(ing => {
                return <li key={ing}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {ing}:{this.props.ings[ing]}
                    </span>
                </li>//Adding Span to uppercase the first letter
            })
        return (
            <div>
                <Auxiliary>
                    <h3>Your order</h3>
                    <p>A delicious burger with the following ingredients:</p>
                    <ul>
                        {ingSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.price.toFixed(2)} $</strong></p>
                    <p>Continue to Checkout?</p>
                    <Button btnType={"Danger"} clicked={this.props.cancel}>
                    CANCEL</Button>
                    <Button btnType={"Success"} clicked={this.props.continue}>
                    {/* <Link to='/checkout' style={{textDecoration: 'none' , color:'#5C9210'}}>
                    CONTINUE
                    </Link> */}
                    CONTINUE</Button>
                </Auxiliary>
            </div>
        );
    }
}

export default OrderSummary;
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import { checkValidity } from '../../../shared/validation'


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'car', displayValue: 'Car' },
                        { value: 'scooter', displayValue: 'Scooter' }
                    ],
                },
                value: 'car',
                validation: {}, //3shan el 2 options yshtghlo sa7
                valid: true //3shan el overall validation test ymshy m3aya f line 138
            },
        },
        readyToSubmit: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value
        }
        const order = {
            ings: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    changeInputHandler = (event, identifier) => {
        const copiedOrderForm = {
            ...this.state.orderForm
        }
        //because the inside elements are still pointers to the original ones
        //and not a copy, we need to copy them too, so:

        //Here you can use updateObject, better than this one
        const deepCopiedOrderForm = {
            ...copiedOrderForm[identifier]
        }
        deepCopiedOrderForm.value = event.target.value;
        deepCopiedOrderForm.valid = checkValidity(deepCopiedOrderForm.value, deepCopiedOrderForm.validation)
        deepCopiedOrderForm.touched = true;
        //yalla b2a nn2l el ta3deel da lel state?
        copiedOrderForm[identifier] = deepCopiedOrderForm;

        let formIsReady = true;
        for (let identifier in copiedOrderForm) {
            formIsReady = copiedOrderForm[identifier].valid && formIsReady;//lazem el etnen ykono true
        }

        this.setState({ orderForm: copiedOrderForm, readyToSubmit: formIsReady })
    }

    render() {
        const orderFormArray = [];
        for (let key in this.state.orderForm) {
            orderFormArray.push({
                id: key,//keys
                config: this.state.orderForm[key]//values
            })
        }

        let form = <Spinner />
        if (!this.props.loading) {
            form = (
                <Auxiliary>
                    <h4>Enter your Contact Data, Please</h4>
                    <form>
                        {orderFormArray.map(element => (
                            <Input
                                key={element.id}
                                elementType={element.config.elementType}
                                elementConfig={element.config.elementConfig}
                                value={element.config.value}
                                invalid={!element.config.valid}
                                //lw validation key msh mwgod fl keys asln htb2a false, gher keda true
                                shouldValidate={element.config.validation}
                                touched={element.config.touched}
                                changed={(event) => this.changeInputHandler(event, element.id)}
                            />
                        ))}
                        <Button disabled={!this.state.readyToSubmit} clicked={this.orderHandler} btnType='Success'>ORDER NOW</Button>
                    </form>
                </Auxiliary>
            )
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ings,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
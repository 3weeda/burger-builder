import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ings: null,
    price: 5,
    error: false
}
const INGS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGS:
            return updateObject(state,
                {
                    ings: {
                        salad: action.ings.salad,
                        bacon: action.ings.bacon,
                        cheese: action.ings.cheese,
                        meat: action.ings.meat
                    },
                    price: 5,
                    error: false
                })
        case actionTypes.FETCH_INGS_FAILED:
            return updateObject(state, { error: true })
        case actionTypes.ADD_INGS:
            return updateObject(state, {
                ings: {
                    ...state.ings,//DEEP COPY!!!!!!!!
                    [action.ingType]: state.ings[action.ingType] + 1
                },
                price: state.price + INGS_PRICES[action.ingType]
            })
        case actionTypes.REMOVE_INGS:
            return updateObject(state, {
                ings: {
                    ...state.ings,//DEEP COPY!!!!!!!!
                    [action.ingType]: state.ings[action.ingType] - 1
                },
                price: state.price - INGS_PRICES[action.ingType]
            })
        case actionTypes.REMOVE_ALL:
            return updateObject(state, {
                ings: {
                    cheese: 0,
                    salad: 0,
                    meat: 0,
                    bacon: 0
                },
                price: 5
            })
        default:
            return state;
    }
};

export default reducer;
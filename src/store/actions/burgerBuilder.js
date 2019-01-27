import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngs = (ingType) => {
    return {
        type: actionTypes.ADD_INGS,
        ingType: ingType
    }
}

export const removeIngs = (ingType) => {
    return {
        type: actionTypes.REMOVE_INGS,
        ingType: ingType
    }
}
//Before async action creator, we write 2 actions, Temp and Error.

//Temp internal action
export const setIngs = (ings) => {
    return {
        type: actionTypes.SET_INGS,
        ings: ings
    }
}

//Error action
export const fetchIngsErrors = () => {
    return {
        type: actionTypes.FETCH_INGS_FAILED,
    }
}

export const initIngs = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(setIngs(response.data))
        }).catch(error => {
            dispatch(fetchIngsErrors())
        })
    }
}


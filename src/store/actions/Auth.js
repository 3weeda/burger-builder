import axios from 'axios';
import * as actionTypes from './actionTypes';

//SPINNER
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
//TEMP action
export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}
//ERROR action
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

//Session expired
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000) //hena b3d sa3a hyhsal log out
    }
}
//Log out
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

//ASYNC REQUEST
export const auth = (email, password, isSignUP) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBD6S-n47-oCJMcP7A9-CCtYd6cmLr9mp0';
        if (!isSignUP) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBD6S-n47-oCJMcP7A9-CCtYd6cmLr9mp0';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.userId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                //you can access error response like this (error.response.data)
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (!token || expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}
import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyAtqHXI1EFSflKv3D_fMhF2Dw7SABPXjWg';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) =>
    (dispatch) => setTimeout(
        () => dispatch(logout()),
        expirationTime * 1000
    );

export const auth = (email, password, isSignup) =>
    (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        const url = isSignup
            ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`
            : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;

        axios
            .post(url, authData)
            .then((response) => {
                localStorage.setItem('token', response.data.idToken);
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(
                    response.data.idToken,
                    response.data.localId
                ));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch((error) => dispatch(authFail(error.response.data.error)))
    };

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
});

export const authCheckState = () =>
    (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const seconds = (expirationDate.getTime() - new Date().getTime()) / 1000;
            if (seconds > 0) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(seconds))
            }
            else {
                dispatch(logout());
            }
        }
    };

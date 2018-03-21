import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyAtqHXI1EFSflKv3D_fMhF2Dw7SABPXjWg';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (authData) => ({
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

export const auth = (email, password) =>
    (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios
            .post(
                `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,
                authData
            )
            .then((response) => dispatch(authSuccess(response.data)))
            .catch((error) => dispatch(authFail(error)))
    };

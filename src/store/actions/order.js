import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
});

export const purchaseBurgerFail = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios
            .post(
                '/orders.json?auth=' + token,
                orderData
            )
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error));
            });
    }
};

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
});

export const fetchOrdersFail = (error) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
});

export const fetchOrders = (token) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token)
            .then((response) => {
                const fetchedOrders = Object.keys(response.data)
                    .map(
                        (id) => ({
                            ...response.data[id],
                            id: id
                        })
                    );
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch((error) => {
                dispatch(fetchOrdersFail(error));
            });
    }
};

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => ({
    ...state,
    purchased: false
});

const purchaseBurgerStart = (state, action) => ({
    ...state,
    loading: true
});

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    }
};

const purchaseBurgerFail = (state, action) => ({
    ...state,
    loading: false
});

const fetchBurgerStart = (state, action) => ({
    ...state,
    loading: true
});

const fetchBurgerSuccess = (state, action) => ({
    ...state,
    orders: action.orders,
    loading: false
});

const fetchBurgerFail = (state, action) => ({
    ...state,
    loading: false
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchBurgerStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchBurgerSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchBurgerFail(state, action);
        default: return state;
    }
};

export default reducer;

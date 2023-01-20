import {
    ADMIN_ORDER_FAIL,
    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_SUCCESS,
    CLEAR_ERRORS,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
} from "../../types/order-constants";

const OrderReducer = (state, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
        case ADMIN_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ORDER_SUCCESS:
        case ADMIN_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case GET_ORDER_FAIL:
        case ADMIN_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default OrderReducer;

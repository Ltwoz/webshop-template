import {
    ADMIN_ORDER_FAIL,
    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_SUCCESS,
    ADMIN_QUEUE_FAIL,
    ADMIN_QUEUE_REQUEST,
    ADMIN_QUEUE_SUCCESS,
    CLEAR_ERRORS,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_QUEUE_FAIL,
    GET_QUEUE_REQUEST,
    GET_QUEUE_SUCCESS,
} from "../../types/history-constants";

const HistoryReducer = (state, action) => {
    switch (action.type) {
        //* Orders
        case GET_ORDER_REQUEST:
        case ADMIN_ORDER_REQUEST:
            return {
                ...state,
                order: {
                    loading: true,
                },
            };
        case GET_ORDER_SUCCESS:
        case ADMIN_ORDER_SUCCESS:
            return {
                ...state,
                order: {
                    loading: false,
                    orders: action.payload,
                },
            };
        case GET_ORDER_FAIL:
        case ADMIN_ORDER_FAIL:
            return {
                ...state,
                order: {
                    loading: false,
                    error: action.payload,
                },
            };

        //* Queues
        case GET_QUEUE_REQUEST:
        case ADMIN_QUEUE_REQUEST:
            return {
                ...state,
                queue: {
                    loading: true,
                },
            };
        case GET_QUEUE_SUCCESS:
        case ADMIN_QUEUE_SUCCESS:
            return {
                ...state,
                queue: {
                    loading: false,
                    queues: action.payload,
                },
            };
        case GET_QUEUE_FAIL:
        case ADMIN_QUEUE_FAIL:
            return {
                ...state,
                queue: {
                    loading: false,
                    error: action.payload,
                },
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                order: {
                    error: null,
                },
            };
        default:
            return state;
    }
};

export default HistoryReducer;

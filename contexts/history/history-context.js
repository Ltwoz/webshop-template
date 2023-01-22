import axios from "axios";
import { createContext, useReducer } from "react";
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
import HistoryReducer from "./history-reducer";

const HistoryContext = createContext();

export const HistoryContextProvider = (props) => {
    const initialState = {
        order: {
            orders: [],
            loading: false,
            error: null,
        },
        queue: {
            queues: [],
            loading: false,
            error: null,
        },
    };

    const [state, dispatch] = useReducer(HistoryReducer, initialState);

    //* Get All Orders
    const getAllOrders = async (userId) => {
        try {
            dispatch({ type: GET_ORDER_REQUEST });

            const { data } = await axios.get(
                `/api/history/orders?user=${userId}`
            );

            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: data.orders,
            });
        } catch (error) {
            dispatch({
                type: GET_ORDER_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Get Admin Orders
    const getAdminOrders = async () => {
        try {
            dispatch({ type: ADMIN_ORDER_REQUEST });

            const { data } = await axios.get(`/api/admin/history/orders`);

            dispatch({
                type: ADMIN_ORDER_SUCCESS,
                payload: data.orders,
            });
        } catch (error) {
            dispatch({
                type: ADMIN_ORDER_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Get All Queues
    const getAllQueues = async (userId) => {
        try {
            dispatch({ type: GET_QUEUE_REQUEST });

            const { data } = await axios.get(
                `/api/history/queues?user=${userId}`
            );

            dispatch({
                type: GET_QUEUE_SUCCESS,
                payload: data.queues,
            });
        } catch (error) {
            dispatch({
                type: GET_QUEUE_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Get Admin Queues
    const getAdminQueues = async () => {
        try {
            dispatch({ type: ADMIN_QUEUE_REQUEST });

            const { data } = await axios.get(`/api/admin/history/queues`);

            dispatch({
                type: ADMIN_QUEUE_SUCCESS,
                payload: data.queues,
            });
        } catch (error) {
            dispatch({
                type: ADMIN_QUEUE_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Clear Errors
    const clearErrors = async () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <HistoryContext.Provider
            value={{
                order: state.order,
                queue: state.queue,
                getAllOrders,
                getAdminOrders,
                getAllQueues,
                getAdminQueues,
                clearErrors,
            }}
        >
            {props.children}
        </HistoryContext.Provider>
    );
};

export default HistoryContext;

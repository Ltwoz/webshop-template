import axios from "axios";
import { createContext, useReducer } from "react";
import { ADMIN_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../../types/order-constants";
import OrderReducer from "./order-reducer";

const OrderContext = createContext();

export const OrderContextProvider = (props) => {
    const initialState = {
        orders: [],
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    //* Get All Orders
    const getAllOrders = async (userId) => {
        try {
            dispatch({ type: GET_ORDER_REQUEST });

            const { data } = await axios.get(`/api/history/orders?user=${userId}`);

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

    //* Clear Errors
    const clearErrors = async () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <OrderContext.Provider
            value={{
                orders: state.orders,
                loading: state.loading,
                error: state.error,
                getAllOrders,
                clearErrors,
                getAdminOrders
            }}
        >
            {props.children}
        </OrderContext.Provider>
    );
};

export default OrderContext;
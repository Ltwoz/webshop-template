import axios from "axios";
import { createContext, useReducer } from "react";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    UPDATE_STOCK_REQUEST,
    UPDATE_STOCK_SUCCESS,
    UPDATE_STOCK_FAIL,
    FEATURED_PRODUCT_REQUEST,
    FEATURED_PRODUCT_SUCCESS,
    FEATURED_PRODUCT_FAIL,
    PRODUCT_PURCHASE_REQUEST,
    PRODUCT_PURCHASE_SUCCESS,
    PRODUCT_PURCHASE_FAIL,
    PRODUCT_QUEUE_PURCHASE_REQUEST,
    PRODUCT_QUEUE_PURCHASE_SUCCESS,
    PRODUCT_QUEUE_PURCHASE_FAIL,
} from "../../types/product-constants";
import refreshSession from "../../utils/refresh-session";
import ProductReducer from "./product-reducer";

const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const initialState = {
        products: [],
        product: {},
        loading: true,
        new: { loading: false },
        delUpdate: { loading: false },
        purchase: { success: false },
        error: null,
        success: false,
        isUpdated: false,
        isStockUpdated: false,
        isDeleted: false,
    };

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    //* Get Featured Products
    const getFeaturedProducts = async () => {
        try {
            dispatch({ type: FEATURED_PRODUCT_REQUEST });

            const { data } = await axios.get(`/api/products?isFeatured=true`);

            dispatch({
                type: FEATURED_PRODUCT_SUCCESS,
                payload: data.products,
            });
        } catch (error) {
            dispatch({
                type: FEATURED_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Create Product -- Admin
    const createProduct = async (form) => {
        try {
            dispatch({ type: NEW_PRODUCT_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                `/api/admin/products/new-product`,
                form,
                config
            );

            dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: NEW_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Update Product -- Admin
    const updateProduct = async (id, form) => {
        try {
            dispatch({ type: UPDATE_PRODUCT_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.put(
                `/api/admin/products/${id}`,
                form,
                config
            );

            dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: UPDATE_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Update Stock -- Admin
    const updateStock = async (id, stock) => {
        try {
            dispatch({ type: UPDATE_STOCK_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                `/api/admin/products/${id}`,
                stock,
                config
            );

            dispatch({ type: UPDATE_STOCK_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: UPDATE_STOCK_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Delete Product -- Admin
    const deleteProduct = async (id) => {
        try {
            dispatch({ type: DELETE_PRODUCT_REQUEST });

            const { data } = await axios.delete(`/api/admin/products/${id}`);

            dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: DELETE_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Purchase Product
    const purchaseProduct = async (id, amount) => {
        try {
            dispatch({ type: PRODUCT_PURCHASE_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                `/api/products/purchase`,
                {
                    product_id: id,
                    amount: amount,
                },
                config
            );

            await refreshSession();

            dispatch({ type: PRODUCT_PURCHASE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: PRODUCT_PURCHASE_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Purchase Product
    const queuePurchaseProduct = async (id, form) => {
        try {
            dispatch({ type: PRODUCT_QUEUE_PURCHASE_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            let body = {
                product_id: id,
                username: form.username,
                password: form.password,
            };

            if (form.uid) {
                body = {
                    product_id: id,
                    uid: form.uid,
                };
            }

            const { data } = await axios.post(
                `/api/products/queue-purchase`,
                body,
                config
            );

            await refreshSession();

            dispatch({ type: PRODUCT_QUEUE_PURCHASE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: PRODUCT_QUEUE_PURCHASE_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Clear Errors
    const clearErrors = async () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                product: state.product,
                loading: state.loading,
                error: state.error,
                success: state.success,
                isUpdated: state.isUpdated,
                isDeleted: state.isDeleted,
                new: state.new,
                delUpdate: state.delUpdate,
                purchase: state.purchase,
                isStockUpdated: state.isStockUpdated,
                getFeaturedProducts,
                createProduct,
                updateProduct,
                updateStock,
                deleteProduct,
                purchaseProduct,
                queuePurchaseProduct,
                clearErrors,
                dispatch,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductContext;

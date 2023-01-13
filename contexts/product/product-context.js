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
} from "../../types/product-constants";
import ProductReducer from "./product-reducer";

const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const initialState = {
        products: [],
        product: {},
        loading: false,
        error: null,
        success: false,
        isUpdated: false,
        isDeleted: false,
    };

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    //* Get All Products
    const getAllProducts = async () => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });

            const { data } = await axios.get(`/api/products`);

            dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data.products });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Get All Products -- Admin
    const getAdminProducts = async () => {
        try {
            dispatch({ type: ADMIN_PRODUCT_REQUEST });

            const { data } = await axios.get(`/api/admin/products`);

            dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
        } catch (error) {
            dispatch({
                type: ADMIN_PRODUCT_FAIL,
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

    //* Get Products Details -- Admin
    const getProductDetails = async (id) => {
        try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST });

            const { data } = await axios.get(`/api/admin/products/${id}`);

            dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
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
                getAllProducts,
                getAdminProducts,
                createProduct,
                updateProduct,
                deleteProduct,
                getProductDetails,
                clearErrors,
                dispatch,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductContext;

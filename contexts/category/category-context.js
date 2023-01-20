import axios from "axios";
import { createContext, useReducer } from "react";
import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    ADMIN_CATEGORY_REQUEST,
    ADMIN_CATEGORY_SUCCESS,
    ADMIN_CATEGORY_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CLEAR_ERRORS,
} from "../../types/category-constants";
import CategoryReducer from "./category-reducer";

const CategoryContext = createContext();

export const CategoryContextProvider = (props) => {
    const initialState = {
        categories: [],
        category: {},
        loading: false,
        error: null,
        success: false,
        isUpdated: false,
        isDeleted: false,
    };

    const [state, dispatch] = useReducer(CategoryReducer, initialState);

    //* Get All Categories
    const getAllCategories = async (id) => {
        try {
            dispatch({ type: ALL_CATEGORY_REQUEST });

            let link = `/api/categories`

            if (id) {
                link = `/api/categories?_id=${id}`
            }

            const { data } = await axios.get(link);

            dispatch({ type: ALL_CATEGORY_SUCCESS, payload: data.categories });
        } catch (error) {
            dispatch({
                type: ALL_CATEGORY_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Get All Categories -- Admin
    const getAdminCategories = async () => {
        try {
            dispatch({ type: ADMIN_CATEGORY_REQUEST });

            const { data } = await axios.get(`/api/admin/categories`);

            dispatch({ type: ADMIN_CATEGORY_SUCCESS, payload: data.categories });
        } catch (error) {
            dispatch({
                type: ADMIN_CATEGORY_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Create Category -- Admin
    const createCategory = async (form) => {
        try {
            dispatch({ type: NEW_CATEGORY_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                `/api/admin/categories/new-category`,
                form,
                config
            );

            dispatch({ type: NEW_CATEGORY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: NEW_CATEGORY_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Update Category -- Admin
    const updateCategory = async (id, form) => {
        try {
            dispatch({ type: UPDATE_CATEGORY_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.put(
                `/api/admin/categories/${id}`,
                form,
                config
            );

            dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: UPDATE_CATEGORY_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Delete Category -- Admin
    const deleteCategory = async (id) => {
        try {
            dispatch({ type: DELETE_CATEGORY_REQUEST });

            const { data } = await axios.delete(`/api/admin/categories/${id}`);

            dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: DELETE_CATEGORY_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    //* Clear Errors
    const clearErrors = async () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <CategoryContext.Provider
            value={{
                categories: state.categories,
                category: state.category,
                loading: state.loading,
                error: state.error,
                success: state.success,
                isUpdated: state.isUpdated,
                isDeleted: state.isDeleted,
                getAllCategories,
                getAdminCategories,
                createCategory,
                updateCategory,
                deleteCategory,
                clearErrors,
                dispatch
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;

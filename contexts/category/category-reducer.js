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
    NEW_CATEGORY_RESET,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET,
    CLEAR_ERRORS,
    ADMIN_DETAILS_CATEGORY_REQUEST,
    ADMIN_DETAILS_CATEGORY_SUCCESS,
    ADMIN_DETAILS_CATEGORY_FAIL,
} from "../../types/category-constants";

const CategoryReducer = (state, action) => {
    switch (action.type) {
        //* Get All Categories
        case ALL_CATEGORY_REQUEST:
        case ADMIN_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case ADMIN_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case ALL_CATEGORY_FAIL:
        case ADMIN_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //* Category Details
        case CATEGORY_DETAILS_REQUEST:
        case ADMIN_DETAILS_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CATEGORY_DETAILS_SUCCESS:
        case ADMIN_DETAILS_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload,
            };
        case CATEGORY_DETAILS_REQUEST:
        case ADMIN_DETAILS_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //* New Category
        case NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                category: action.payload.category,
            };
        case NEW_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_CATEGORY_RESET:
            return {
                ...state,
                success: false,
            };

        //* Update Category
        case UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_CATEGORY_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
                error: null,
            };

        //* Delete Category
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_CATEGORY_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false,
            };
        default:
            return state;
    }
};

export default CategoryReducer;

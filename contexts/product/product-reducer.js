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
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    UPDATE_STOCK_REQUEST,
    UPDATE_STOCK_SUCCESS,
    UPDATE_STOCK_FAIL,
    UPDATE_STOCK_RESET,
    FEATURED_PRODUCT_REQUEST,
    FEATURED_PRODUCT_SUCCESS,
    FEATURED_PRODUCT_FAIL,
    PRODUCT_PURCHASE_REQUEST,
    PRODUCT_PURCHASE_SUCCESS,
    PRODUCT_PURCHASE_FAIL,
    PRODUCT_PURCHASE_RESET,
    PRODUCT_QUEUE_PURCHASE_REQUEST,
    PRODUCT_QUEUE_PURCHASE_SUCCESS,
    PRODUCT_QUEUE_PURCHASE_FAIL,
    PRODUCT_QUEUE_PURCHASE_RESET,
} from "../../types/product-constants";

const ProductReducer = (state, action) => {
    switch (action.type) {
        //* Get All Products
        case ALL_PRODUCT_REQUEST:
        case FEATURED_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_PRODUCT_SUCCESS:
        case FEATURED_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                // productsCount: action.payload.productsCount,
                // resultPerPage: action.payload.resultPerPage,
                // filteredProductsCount: action.payload.filteredProductsCount,
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case ALL_PRODUCT_FAIL:
        case FEATURED_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //* Create Products
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                new: {
                    loading: true,
                },
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                new: {
                    loading: false,
                },
                success: action.payload.success,
                product: action.payload.product,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                new: {
                    loading: false,
                },
                error: action.payload,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };

        //* Update and Delete Product
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case UPDATE_STOCK_REQUEST:
            return {
                ...state,
                delUpdate: {
                    loading: true,
                },
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                delUpdate: {
                    loading: false,
                },
                isDeleted: action.payload,
            };

        case UPDATE_PRODUCT_SUCCESS:
        case UPDATE_STOCK_SUCCESS:
            return {
                ...state,
                delUpdate: {
                    loading: false,
                },
                isUpdated: action.payload,
            };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case UPDATE_STOCK_FAIL:
            return {
                ...state,
                delUpdate: {
                    loading: false,
                },
                error: action.payload,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_PRODUCT_RESET:
        case UPDATE_STOCK_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        //* Get Product Details
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //* Purchase Product
        case PRODUCT_PURCHASE_REQUEST:
        case PRODUCT_QUEUE_PURCHASE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_PURCHASE_SUCCESS:
        case PRODUCT_QUEUE_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchase: {
                    success: true
                }
            }
        case PRODUCT_PURCHASE_FAIL:
        case PRODUCT_QUEUE_PURCHASE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCT_PURCHASE_RESET:
        case PRODUCT_QUEUE_PURCHASE_RESET:
            return {
                ...state,
                purchase: {
                    success: false
                }
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default ProductReducer;

import {
    GET_CONFIG_REQUEST,
    GET_CONFIG_SUCCESS,
    GET_CONFIG_FAIL,
    UPDATE_CONFIG_REQUEST,
    UPDATE_CONFIG_SUCCESS,
    UPDATE_CONFIG_FAIL,
    UPDATE_CONFIG_RESET,
    CLEAR_ERRORS,
} from "../../types/config-constants";

const ConfigReducer = (state, action) => {
    switch (action.type) {
        case GET_CONFIG_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                configs: action.payload,
            };
        case GET_CONFIG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_CONFIG_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
            };
        case UPDATE_CONFIG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_CONFIG_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export default ConfigReducer;

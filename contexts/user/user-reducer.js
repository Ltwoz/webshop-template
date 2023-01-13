import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    // USER_DELETE_REQUEST,
    // USER_DELETE_SUCCESS,
    // USER_DELETE_FAIL,
    // USER_DELETE_RESET,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    CLEAR_ERRORS,
} from "../../types/user-constants";

const UserReducer = (state, action) => {
    switch (action.type) {

        //* Login & Register
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                user: action.payload.user,
            };
        case USER_UPDATE_PROFILE_FAIL:
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: {},
            };

        //* User Details
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                userDetailsScreen: { loading: true },
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetailsScreen: {
                    loading: false,
                    success: true,
                    userDetails: action.payload,
                },
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                userDetailsScreen: { loading: false, error: action.payload },
            };
        case USER_DETAILS_RESET:
            return {
                ...state,
                userDetailsScreen: {
                    loading: false,
                    success: false,
                    userDetails: {},
                    error: null,
                },
            };

        //* User Update
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                userInfo: action.payload,
                userDetailsScreen: { userDetails: action.payload },
            };
        case USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_UPDATE_PROFILE_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: null,
            };
        
        //* Delete User
        // case USER_DELETE_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     };
        // case USER_DELETE_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         userDetailsScreen: {
        //             isDeleted: action.payload.success,
        //             message: action.payload.message,
        //         },
        //     };
        // case USER_DELETE_FAIL:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //     };
        // case USER_DELETE_RESET:
        //     return {
        //         ...state,
        //         userDetailsScreen: { isDeleted: false },
        //     };

        //* User List
        case ALL_USER_REQUEST:
            return {
                ...state,
                userListScreen: { loading: true },
            };
        case ALL_USER_SUCCESS:
            return {
                ...state,
                userListScreen: {
                    loading: false,
                    success: true,
                    users: action.payload,
                },
            };
        case ALL_USER_FAIL:
            return {
                ...state,
                userListScreen: { loading: false, error: action.payload },
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                userListScreen: { error: null },
                userDetailsScreen: { error: null }
            }
        default: {
            return state;
        }
    }
};

export default UserReducer;

import { createContext, useContext, useReducer } from "react";
import UserReducer from "./user-reducer";
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
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

export const UserContextProvider = (props) => {
    const userFromSSR = props.value ? props.value : {};

    const initialState = {
        user: userFromSSR,
        userListScreen: {
            users: [],
            loading: true,
            success: false,
            error: null,
        },
        userDetailsScreen: {
            userDetails: {},
            loading: false,
            success: false,
            error: null,
        },
        loading: false,
        success: false,
        error: null,
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    //* Register User
    const register = async (username, email, password) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                "/api/auth/register",
                {
                    username,
                    email,
                    password,
                },
                config
            );

            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    //* get All Users -- Admin
    const getAllUsers = async () => {
        try {
            dispatch({ type: ALL_USER_REQUEST });

            const { data } = await axios.get("/api/admin/users");

            dispatch({
                type: ALL_USER_SUCCESS,
                payload: data.users,
            });
        } catch (error) {
            dispatch({
                type: ALL_USER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    //* Delete User
    // const deleteUser = async (id) => {
    //     try {
    //         dispatch({ type: USER_DELETE_REQUEST })

    //         const { data } = await axios.delete(`/api/admin/users/${id}`);

    //         dispatch({
    //             type: USER_DELETE_SUCCESS,
    //             payload: data
    //         })
    //     } catch (error) {
    //         dispatch({
    //             type: USER_DELETE_FAIL,
    //             payload:
    //                 error.response && error.response.data.message
    //                     ? error.response.data.message
    //                     : error.message,
    //         });
    //     }
    // };

    //* Clear Errors
    const clearErrors = async () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    // props.value
    return (
        <UserContext.Provider
            value={{
                user: state.user,
                userDetailsScreen: state.userDetailsScreen,
                userListScreen: state.userListScreen,
                loading: state.loading,
                error: state.error,
                success: state.success,
                register,
                getAllUsers,
                // deleteUser,
                clearErrors,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;

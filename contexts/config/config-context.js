import { createContext, useReducer } from "react";
import ConfigReducer from "./config-reducer";
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
import axios from "axios";

const ConfigContext = createContext();

export const ConfigContextProvider = (props) => {
    const configsFromSSR = props.value ? props.value : {};

    const initialState = {
        configs: configsFromSSR,
        loading: false,
        error: null,
        isUpdated: false,
    };

    const [state, dispatch] = useReducer(ConfigReducer, initialState);

    //* Get Configs
    const getConfig = async () => {
        try {
            dispatch({ type: GET_CONFIG_REQUEST });

            const { data } = await axios.get("/api/configs");

            dispatch({
                type: GET_CONFIG_SUCCESS,
                payload: data.configs,
            });
        } catch (error) {
            dispatch({
                type: GET_CONFIG_FAIL,
                payload: error.response.data.message
            });
        }
    };

    //* Update Configs
    const updateConfig = async (configsForm) => {
        try {
            dispatch({ type: UPDATE_CONFIG_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.patch(
                "/api/admin/configs",
                configsForm,
                config
            );

            dispatch({
                type: UPDATE_CONFIG_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_CONFIG_FAIL,
                payload: error.response.data.message
            });
        }
    };

    //* Clear Errors
    const clearErrors = async () => {
        dispatch({ type: CLEAR_ERRORS });
    }

    return (
        <ConfigContext.Provider
            value={{
                configs: state.configs,
                loading: state.loading,
                error: state.error,
                isUpdated: state.isUpdated,
                getConfig,
                updateConfig,
                clearErrors,
                dispatch
            }}
        >
            {props.children}
        </ConfigContext.Provider>
    );
};

export default ConfigContext;

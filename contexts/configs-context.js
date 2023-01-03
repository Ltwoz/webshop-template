import { createContext } from "react";

const ConfigsContext = createContext();

export const ConfigsContextProvider = (props) => {
    return (
        <ConfigsContext.Provider value={props.value}>
            {props.children}
        </ConfigsContext.Provider>
    );
};

export default ConfigsContext;

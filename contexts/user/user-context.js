import { createContext } from "react";

const UserContext = createContext();

export const UserContextProvider = (props) => {
    return (
        <UserContext.Provider value={props.value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
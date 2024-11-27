import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children, userId }) => {
    return (
        <UserContext.Provider value={{ userId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};

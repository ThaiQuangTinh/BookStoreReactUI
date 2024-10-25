import { createContext, useState } from 'react';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');

    return (
        <AuthContext.Provider value={{
            isLoggedIn, setIsLoggedIn, userName, setUserName,
            role, setRole
        }}>
            {children}
        </AuthContext.Provider>
    );
};

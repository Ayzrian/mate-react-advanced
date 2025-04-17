import { createContext, ReactElement, useState } from "react";

export interface AuthContextValues {
    loggedIn: boolean;
    login: (userName: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextValues>({
    loggedIn: false,
    login: () => {
        throw new Error('Not implemented!');
    }
});

export interface AuthProviderProps {
    children: ReactElement;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [loggedIn, setLoggedIn] = useState(false);

    const login = (userName: string, password: string) => {
        // TODO: Impelement auth with server.

        setLoggedIn(true);
    }

    return <AuthContext.Provider value={{
        loggedIn,
        login,
    }}>
        {children}
    </AuthContext.Provider>
}
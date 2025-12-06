import React from "react";
import { createContext } from "react";

interface UserContextValue {
    userId:    string;
    userName:  string;
    isLogged:  boolean;
    logIn:     (id: string, name: string)=>void;
    logOut:    ()=>void;
}

export const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({children}: React.PropsWithChildren)=>{
    const [userId, setUserId]       = React.useState<string>("");
    const [userName, setUserName]   = React.useState<string>("");

    const value: UserContextValue = {
        userId,
        userName,
        isLogged: userId !== "",
        logIn: (id: string, name: string)=>{
            setUserId(id);
            setUserName(name);
        },
        logOut: ()=>{
            setUserId("");
            setUserName("");
        }
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}



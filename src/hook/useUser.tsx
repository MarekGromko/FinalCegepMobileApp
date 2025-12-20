import { JSX, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext"
import { Redirect, useRouter } from "expo-router";

export const useUser = () => {
    return useContext(UserContext);
};

export const useAssertUser = (path = "/login") => {
    const user   = useUser();
    const [state, setState] = useState('loading');
    useEffect(() => {
        if (!user.isLogged) 
            setState('redirect');
        else 
            setState('logged');
    }, [user.isLogged]);
    switch(state) {
        case 'loading':
            return (<></>);
        case 'redirect':
            return <Redirect href={path}/>
        case 'logged':
        default:
            return null;
    }
};

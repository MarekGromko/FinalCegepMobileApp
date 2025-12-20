import { useContext, useLayoutEffect } from "react";
import { UserContext } from "../context/UserContext"
import { useRouter } from "expo-router";

export const useUser = () => {
    return useContext(UserContext);
};

export const useAssertUser = (path = "/login") => {
    const user = useUser();
    const router = useRouter();

    useLayoutEffect(() => {
        if (!user.isLogged) {
            router.replace(path);
        }
    }, [user.isLogged]);

    return user.isLogged;
};

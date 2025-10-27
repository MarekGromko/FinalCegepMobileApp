import { useContext } from "react";
import { ViewStyle, ImageStyle, TextStyle } from "react-native";
import { ThemeContext, ThemeLabels } from "../context/ThemeContext";

interface StyleSheet{
    [k: string]: ViewStyle | ImageStyle | TextStyle | {[k: string]: string}
}

interface StyleFactory<T> {
    (
        layout: ThemeLayout, 
        theme:  ThemeLabels
    ): T
}

export const useThemedStyle = <T extends StyleSheet>(styleFactory: StyleFactory<T>)=>{
    const { theme, label } = useContext(ThemeContext);
    return styleFactory(theme, label);
}

export const ThemedStyle = <T extends StyleSheet>(styleFactory: StyleFactory<T>) => {
    return styleFactory;
}
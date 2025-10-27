import { useContext } from "react";
import { ViewStyle, ImageStyle, TextStyle } from "react-native";
import { ThemeContext, ThemeLabels } from "../context/ThemeContext";

/** CSS styles properties */
interface StyleSheet{
    [k: string]: ViewStyle | ImageStyle | TextStyle | {[k: string]: any}
}

/** A callback that create a stylesheet */
interface StyleFactory<T> {
    (
        layout: ThemeLayout, 
        theme:  ThemeLabels
    ): T
}

/**
 * Hook that create a StyleSheet given a StyleFactory
 * @param styleFactory Called when the theme context changes
 * @returns the created StyleFactory
 */
export const useThemedStyle = <T extends StyleSheet>(styleFactory: StyleFactory<T>)=>{
    const { theme, label } = useContext(ThemeContext);
    return styleFactory(theme, label);
}

/**
 * Helper Wrapper to type a ThemedStyle in js/jsx files
 * 
 * @example
 * ```js
 *  // styleFactory will be correctly typed
 *  const styleFactory = ThemedStyle((theme)=>({
 *      test: {
 *          color: theme.color // IntelliSense can help see the proeprties of "theme"
 *      }
 *  }))
 * ```
 * @param styleFactory 
 * @returns 
 */
export const ThemedStyle = <T extends StyleSheet>(styleFactory: StyleFactory<T>) => {
    return styleFactory;
}
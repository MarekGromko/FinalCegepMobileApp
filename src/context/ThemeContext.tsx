import React, { createContext, useState } from "react"

/** Map of themes (label:ThemeLayout) */
export const themes = {
    "dark":  require("../style/themes/dark").default  as ThemeLayout,
    "light": require("../style/themes/light").default as ThemeLayout
}
/** List with all the theme labels */
type ThemeLabels = keyof typeof themes;

/** The value extraceted & put inside the React.Context */
interface ThemeContextValue {
    label:    ThemeLabels
    theme:    ThemeLayout,
    isDark:   boolean,
    setTheme: (theme: ThemeLabels)=>void
}

/** React Theme Content, global and unique the the whole application */
export const ThemeContext  = createContext<ThemeContextValue | null>(null);

/** A JSXElement providing a theme */
export const ThemeProvider = ({children}: React.PropsWithChildren)=>{
    const [currentTheme, setCurrentTheme] = useState<ThemeLabels>("light");

    const value: ThemeContextValue = {
        isDark:    currentTheme === 'dark',
        label:     currentTheme,
        theme:     themes[currentTheme],
        setTheme:  (theme)=>void setCurrentTheme(theme)
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export type {
    ThemeLabels,
    ThemeContextValue
}
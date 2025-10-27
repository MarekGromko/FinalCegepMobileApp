import React, { createContext, useState } from "react"

export const themes = {
    "dark":  require("../style/themes/dark").default  as ThemeLayout,
    "light": require("../style/themes/light").default as ThemeLayout
}

type ThemeLabels = keyof typeof themes;

interface ThemeContextValue {
    label:    ThemeLabels
    theme:    ThemeLayout,
    isDark:   boolean,
    setTheme: (theme: ThemeLabels)=>void
}

export const ThemeContext  = createContext<ThemeContextValue | null>(null);

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
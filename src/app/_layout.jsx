import "../i18n/config"
import "../i18n/config.d"

import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useTranslation } from "react-i18next";
import { UserProvider } from "@src/context/UserContext";
import { Stack } from 'expo-router';
import { ThemedStyle, useThemedStyle } from '@src/hook/useThemedStyle';
import { ThemeProvider } from "@src/context/ThemeContext";
import { CS } from "@src/style/CommonStyle"

import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
NavigationBar.setVisibilityAsync('hidden'); 

const tsf = ThemedStyle((theme) => ({
    header: { backgroundColor: theme.backgroundPanel },
    headerText: { color: theme.text },
    primary: { color: theme.primary },
    textDim: { color: theme.textDim },
    content: { backgroundColor: theme.background }
}));

function StackLayout() {
    const ts = useThemedStyle(tsf);
    const { t } = useTranslation();
    return (
        <Stack
            screenOptions={{
                contentStyle: ts.content,
                headerStyle: { 
                    backgroundColor: ts.header.backgroundColor 
                },
                headerTintColor: ts.headerText.color,
                headerTitleStyle: { ...CS.Font.bold }
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ title: t("tabs:login") }} />
            <Stack.Screen name="signUp" options={{ title: t("tabs:signup") }} />
            <Stack.Screen name="details/[code]" options={{ title: t("tabs:details") }} />
        </Stack>
    );
}

export default function RootLayout() {
    const [loaded] = useFonts({
        "inter-regular":        require('@assets/fonts/Inter/Inter-Regular.ttf'),
        "inter-light":          require('@assets/fonts/Inter/Inter-Light.ttf'),
        "inter-medium":         require('@assets/fonts/Inter/Inter-Medium.ttf'),
        "inter-bold":           require('@assets/fonts/Inter/Inter-Bold.ttf'),
        "inter-regular-italic": require('@assets/fonts/Inter/Inter-Regular-Italic.ttf'),
        "inter-light-italic":   require('@assets/fonts/Inter/Inter-Light-Italic.ttf'),
        "inter-medium-italic":  require('@assets/fonts/Inter/Inter-Medium-Italic.ttf'),
        "inter-bold-italic":    require('@assets/fonts/Inter/Inter-Bold-Italic.ttf')
    });
    
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync(); 
        }
    }, [loaded]);

    if (!loaded) return null;

    return (
        <UserProvider>
            <ThemeProvider>
                <StackLayout />
            </ThemeProvider>
        </UserProvider>
    );
}
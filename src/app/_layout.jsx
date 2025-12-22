import "../i18n/config"
import "../i18n/config.d"

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { UserProvider } from "@src/context/UserContext";
import { ThemeProvider } from "@src/context/ThemeContext";

import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
NavigationBar.setVisibilityAsync('hidden'); 

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
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="details/[code]" options={{ headerShown: false }}/>
                </Stack>
            </ThemeProvider>
        </UserProvider>
    );
}
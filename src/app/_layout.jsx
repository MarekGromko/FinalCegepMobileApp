import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        "inter":        require('@assets/fonts/Inter/Inter-Regular.ttf'),
        "inter-light":  require('@assets/fonts/Inter/Inter-Light.ttf'),
        "inter-medium": require('@assets/fonts/Inter/Inter-Medium.ttf'),
        "inter-bold":   require('@assets/fonts/Inter/Inter-Bold.ttf'),
        "inter-italic":        require('@assets/fonts/Inter/Inter-Regular-Italic.ttf'),
        "inter-light-italic":  require('@assets/fonts/Inter/Inter-Light-Italic.ttf'),
        "inter-medium-italic": require('@assets/fonts/Inter/Inter-Medium-Italic.ttf'),
        "inter-bold-italic":   require('@assets/fonts/Inter/Inter-Bold-Italic.ttf')
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hide();
        }
    }, [loaded]);

    // if (!loaded) {
    //     return null;
    // }

    return <Stack />;
}

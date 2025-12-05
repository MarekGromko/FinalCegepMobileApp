import { useFonts } from 'expo-font';
import { Stack,Tabs} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyle, ThemedStyle } from '../hook/useThemedStyle';
import { CS } from '../style/CommonStyle';
import { Text, View } from 'react-native'; 
import * as NavigationBar from 'expo-navigation-bar';
SplashScreen.preventAutoHideAsync();
NavigationBar.setVisibilityAsync('hidden'); 

const tsf = ThemedStyle((theme) => ({
    header: { backgroundColor: theme.backgroundPanel },
    headerText: { color: theme.text },
    primary: { color: theme.primary },
    textDim: { color: theme.textDim },
    backgroundCard: { backgroundColor: theme.backgroundCard }
}));


const ThemedTabs = () => {
    const ts = useThemedStyle(tsf);

    return (
        <Tabs screenOptions={{ 
            tabBarActiveTintColor: ts.primary.color, 
            tabBarInactiveTintColor: ts.textDim.color,
            tabBarStyle: { 
                backgroundColor: ts.backgroundCard.backgroundColor, 
                borderTopColor: ts.backgroundCard.backgroundColor, 
                height: 60, 
                paddingBottom: 5 
            },
            headerShown: true,
            headerStyle: { backgroundColor: ts.header.backgroundColor },
            headerTintColor: ts.headerText.color,
            headerTitleStyle: { ...CS.Font.bold }
        }}>
            
            <Tabs.Screen 
                name="index" 
                options={{
                    title:"",
                    tabBarIcon: ({ color }) => (<Ionicons name="home" color={color} size={32} />),
                }}
            />
            <Tabs.Screen 
                name="conversionScreen" 
                options={{
                    title:"",
                    tabBarIcon: ({ color }) => (<Ionicons name="repeat" color={color} size={32} />),
                }}
            />
            
            <Tabs.Screen 
                name="currencies" 
                options={{
                    title:"",
                    tabBarIcon: ({ color }) => (<Ionicons name="cash-outline" color={color} size={32} />),
                }}
            />

           <Tabs.Screen
                name="details/[code]"
                options={{
                    title: '',
                    href: null,
                }}
            /> 

            <Tabs.Screen
                name="Search"
                options={{
                    title: 'Search',
                    tabBarIcon : ({color}) => (<Ionicons name="search" color={color} size={24}/>),
                }}
            />  


        </Tabs>
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
        <ThemeProvider>
            <ThemedTabs />
        </ThemeProvider>
    );
}
import { Tabs} from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyle, ThemedStyle } from '@src/hook/useThemedStyle';
import { CS } from "@src/style/CommonStyle";
import * as NavigationBar from 'expo-navigation-bar';
NavigationBar.setVisibilityAsync('hidden'); 

const tsf = ThemedStyle((theme) => ({
    header: { backgroundColor: theme.backgroundPanel },
    headerText: { color: theme.text },
    primary: { color: theme.primary },
    textDim: { color: theme.textDim },
    backgroundCard: { backgroundColor: theme.backgroundCard }
}));

export default function TabLayout() {
    const ts = useThemedStyle(tsf);
    return (
        <Tabs
            initialRouteName="search"
            screenOptions={{ 
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
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({color}) => (<Ionicons name="search" color={color} size={32}/>),
                }}
            />
            <Tabs.Screen
                name="conversion"
                options={{
                    title: 'Conversion',
                    tabBarIcon: ({ color }) => (<Ionicons name="repeat" color={color} size={32} />)
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Shortcuts',
                    tabBarIcon: ({ color }) => (<Ionicons name="star" color={color} size={32} />)
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => (<Ionicons name="settings-outline" color={color} size={32} />)
                }}
            />
        </Tabs>
    );
}
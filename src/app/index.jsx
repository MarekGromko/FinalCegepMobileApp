import { Switch, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { ThemedStyle, useThemedStyle } from '../hook/useThemedStyle';
import { ThemeContext } from '../context/ThemeContext';
import { CS } from '../style/CommonStyle';
import { router } from 'expo-router';
// for ease of use, I give short variables name for stylesheets
// ss   = the static stylesheet
// tsf  = the theme style factory function
// ts   = the theme style sheet

export default function RootPage(){
    const { isDark, setTheme } = useContext(ThemeContext);
    const ts = useThemedStyle(tsf)
    return (
        // combine both Static Style & Themed Style this way
        <View style={[ss.page, ts.page]}>
            <View style={[ss.setting, ts.setting]}>
                <Text style={[CS.Font.light, ts.text]}>dark mode : </Text>
                <Switch
                    // was just trying some stuff out...
                    // this is in fact overcomplicated, if we ever have some components like that,
                    // we should extract them and put them inside /component
                    {...Platform.select({
                        ios: {},
                        default: {
                            style: {height: 18, backgroundColor: 'red'},
                            trackColor: ts.switch.trackColor,
                            thumbColor: '#513d3dff',
                            activeThumbColor: '#FFFFFF'
                        }
                    })}
                    onValueChange={value=>setTheme(value ? 'dark' : 'light')}
                    value={isDark ? true : false}
                ></Switch>
            </View>
            <Text style={[ss.text, ts.text]}>Hello World!</Text>
        </View>
    );
}

// create a static StyleSheet
const ss = StyleSheet.create({
    page: {
        // populate page class with all the css properties to make a centered column
        ...CS.Flex.centeredColumn(12),
        ...CS.padding(16),
        justifyContent: 'flex-start',
        flex: 1,
    },
    setting: {
        ...CS.Flex.centeredRow(8),
        ...CS.padding(12, 18),
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 12,
    },
    // alternatively, you could just do text: CS.Font.boldItalic
    text: {
        ...CS.Font.boldItalic
    }

});

// the ThemedStyleFactory
const tsf = ThemedStyle((theme)=>({
    page: {
        backgroundColor: theme.background
    },
    setting: {
        backgroundColor: theme.backgroundPanel
    },
    text: {
        color: theme.text
    },
    switch: {
        trackColor: {
            false: theme.textDim,
            true:  theme.primary
        }
    }
}));
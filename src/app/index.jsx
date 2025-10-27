import { Switch, StyleSheet, Text, View, Platform } from 'react-native';
import { useContext } from 'react';
import { ThemedStyle, useThemedStyle } from '../hook/useThemedStyle';
import { ThemeContext, themes } from '../context/ThemeContext';
import { CS } from '../style/CommonStyle';

export default function RootPage(){
    const { isDark, setTheme } = useContext(ThemeContext);
    const ts = useThemedStyle(styleFactory)
    return (
        <View style={[ss.page, ts.page]}>
            <View style={[ss.setting, ts.setting]}>
                <Text style={[CS.Font.light, ts.text]}>dark mode : </Text>
                <Switch
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

const ss = StyleSheet.create({
    page: {
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
    text: CS.Font.boldItalic
});

const styleFactory = ThemedStyle((theme)=>({
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
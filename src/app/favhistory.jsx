import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Alert } from "react-native";
import { ThemedStyle, useThemedStyle } from "../hook/useThemedStyle";
import { flagsMap } from "../data/flags";
import { currencyMap } from "../data/currencies";
import CurrencyShortcut from "../component/CurrencyShortcut";
import { CS } from "../style/CommonStyle";

var confirmDeleteAlert = (onConfirm, onCancel)=> {
    Alert.alert(
        "Delete shortcu",
        "Are you sure you want to delete this shortcut?",
        [
            { text: "Delete", onPress: onConfirm, style: "ok" },
            { text: "Cancel", onPress: onCancel, style: "cancel" }
        ]
    )
}

// Liste des conversions populaires
const shortcuts = [
    { from: 'USD', to: 'EUR' },
    { from: 'CAD', to: 'USD' },
    { from: 'GBP', to: 'EUR' },
    { from: 'JPY', to: 'USD' },
    { from: 'CHF', to: 'EUR' },
    { from: 'AUD', to: 'USD' },
    { from: 'CNY', to: 'USD' },
    { from: 'EUR', to: 'GBP' },
];

export default function ShortcutStack() {
    const ts = useThemedStyle(tsf);

    const handleShortcutPress = (from, to) => {
        confirmDeleteAlert(()=>{}, ()=>{});
    };

    return (
        <ScrollView horizontal={false} style={[ss.container, ts.container]}>
            <View style={ss.titleSection}>
                <TouchableOpacity>
                    <Text style={{color: ts.title.color}}>Edit</Text>
                </TouchableOpacity>
                <Text style={[ss.title, ts.title]}>Shortcuts</Text>
            </View>
            <ScrollView horizontal={true}>
                
                <View style={ss.shortcutsList}>
                    {shortcuts.map((shortcut, index) => {
                        const fromCurrency = currencyMap[shortcut.from];
                        const toCurrency   = currencyMap[shortcut.to];
                        const fromFlag     = flagsMap[fromCurrency.users[0]] || '';
                        const toFlag       = flagsMap[toCurrency.users[0]]   || '';
                        
                        return (
                            <CurrencyShortcut
                                key={`${shortcut.from}-${shortcut.to}-${index}`}
                                fromCurrency={shortcut.from}
                                toCurrency={shortcut.to}
                                fromSign={fromCurrency.sign}
                                toSign={toCurrency.sign}
                                fromFlag={fromFlag}
                                toFlag={toFlag}
                                onPress={() => handleShortcutPress(shortcut.from, shortcut.to)}
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </ScrollView>
    );
}

const ss = StyleSheet.create({
    container: {
        flex: 1,
        ...CS.padding(16),
    },
    title: {
        ...CS.Font.bold,
        fontSize: 24,
        marginBottom: 16,
        marginTop: 8,
    },
    shortcutsList: {
        ...CS.Flex.centeredRow(0),
        width: '100%',
        paddingBottom: 24,
    },
});

const tsf = ThemedStyle((theme) => ({
    container: {
        backgroundColor: theme.background,
    },
    title: {
        color: theme.textDim,
    },
}));
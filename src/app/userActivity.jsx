import { StyleSheet, TouchableOpacity, View, Text, Alert, FlatList } from "react-native";
import { ThemedStyle, useThemedStyle } from "../hook/useThemedStyle";
import { flagsMap } from "../data/flags";
import { currencyMap } from "../data/currencies";
import CurrencyShortcut from "../component/CurrencyShortcut";
import HistoryEntry from "../component/HistoryEntry";
import { CS } from "../style/CommonStyle";
import { useState } from "react";
import { useRerender } from "../hook/useRerender";

var alertDeleteShorcut = (onConfirm = ()=>{}, onCancel = ()=>{})=> {
    Alert.alert(
        "Delete shortcu",
        "Are you sure you want to delete this shortcut?",
        [
            { text: "Delete", onPress: onConfirm, style: "ok" },
            { text: "Cancel", onPress: onCancel, style: "cancel" }
        ]
    )
}
const shortcuts = [
    { from: 'USD', to: 'EUR' },
    { from: 'CAD', to: 'USD' },
    { from: 'GBP', to: 'EUR' },
    { from: 'JPY', to: 'USD' },
    { from: 'CHF', to: 'EUR' },
    { from: 'AUD', to: 'USD' },
    { from: 'CNY', to: 'USD' },
    { from: 'EUR', to: 'GBP' },
]
const historyEntries = [
    {
        from: 'USD',
        to: 'EUR',
        fromAmount: 100,
        toAmount: 92.35,
        rate: 0.9235,
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
        from: 'CAD',
        to: 'USD',
        fromAmount: 250,
        toAmount: 185.50,
        rate: 0.7420,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        from: 'GBP',
        to: 'EUR',
        fromAmount: 50,
        toAmount: 58.75,
        rate: 1.1750,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
        from: 'JPY',
        to: 'USD',
        fromAmount: 10000,
        toAmount: 67.23,
        rate: 0.006723,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
        from: 'CHF',
        to: 'EUR',
        fromAmount: 200,
        toAmount: 214.80,
        rate: 1.0740,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
        from: 'AUD',
        to: 'USD',
        fromAmount: 150,
        toAmount: 97.35,
        rate: 0.6490,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
        from: 'EUR',
        to: 'GBP',
        fromAmount: 300,
        toAmount: 255.30,
        rate: 0.8510,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
    {
        from: 'CNY',
        to: 'USD',
        fromAmount: 500,
        toAmount: 69.15,
        rate: 0.1383,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
]

export default function ShortcutStack() {
    const ts = useThemedStyle(tsf);
    const rerender = useRerender();
    const [deleting, setDeleting] = useState(false);

    const handleShortcutPress = (from, to) => {
        const index = shortcuts.findIndex(s => s.from === from && s.to === to);
        if(deleting) {
            alertDeleteShorcut(
                ()=>{
                    shortcuts.splice(index, 1)
                    rerender();
                },
                ()=>{
                    setDeleting(false)
                }
            );
        }
    };

    const handleShortcutEditingPress = () => {
        setDeleting(!deleting);
    }

    return (
        <View style={[ss.container, ts.container]}>
            <View style={ss.titleSection}>
                <Text style={[ss.title, ts.title]}>Shortcuts</Text>
                <TouchableOpacity onPress={handleShortcutEditingPress}>
                    <Text style={{color: ts.title.color}}>{deleting ? "Done" : "Edit"}</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                horizontal
                style={ss.list}
                data={shortcuts}
                renderItem={({item})=> {
                    const fromCurrency = currencyMap[item.from];
                    const toCurrency   = currencyMap[item.to];
                    const fromFlag     = flagsMap[fromCurrency.users[0]] || '';
                    const toFlag       = flagsMap[toCurrency.users[0]] || '';
                    
                    return (
                        <CurrencyShortcut
                            fromCurrency={item.from}
                            toCurrency={item.to}
                            fromSign={fromCurrency.sign}
                            toSign={toCurrency.sign}
                            fromFlag={fromFlag}
                            toFlag={toFlag}
                            deleting={deleting}
                            onPress={() => handleShortcutPress(item.from, item.to)}
                        />
                    );
                }}
                keyExtractor={item => `${item.from}->${item.to}`}
            />
            <View style={ss.titleSection}>
                <Text style={[ss.title, ts.title]}>History</Text>
            </View>
            
            <FlatList 
                style={ss.historyList}
                data={historyEntries}
                renderItem={({item}) => (
                    <HistoryEntry
                        fromCurrency={item.from}
                        toCurrency={item.to}
                        fromSign={currencyMap[item.from].sign}
                        toSign={currencyMap[item.to].sign}
                        fromAmount={item.fromAmount}
                        toAmount={item.toAmount}
                        rate={item.rate}
                        timestamp={item.timestamp}
                        fromFlag={flagsMap[currencyMap[item.from].users[0]]}
                        toFlag={flagsMap[currencyMap[item.to].users[0]]}
                    />
                )}
                keyExtractor={(_, index) => index}
            />
        </View>
    );
}

const ss = StyleSheet.create({
    container: {
        ...CS.padding(16),
        paddingBottom: 0,
        flex: 1,
    },
    titleSection: {
        ...CS.Flex.row(16),
        alignItems: 'baseline'
    },
    title: {
        ...CS.Font.bold,
        fontSize: 24,
    },
    list: {
        flex: 0,
        maxHeight: 120,
        paddingBottom: 24,
    },
    historyList: {
        flex: 1,
        marginTop: 8,
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
import { 
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text, 
    Alert, 
    FlatList 
} from "react-native";
import { useState } from "react";
import { ThemedStyle, useThemedStyle } from "@src/hook/useThemedStyle";
import { useRerender } from     "@src/hook/useRerender";
import { useAssertUser } from      '@src/hook/useUser';
import { CS } from              "@src/style/CommonStyle";
import HistoryEntry from        "@src/component/HistoryEntry";
import CurrencyShortcut from    "@src/component/CurrencyShortcut";
import shortcuts from           "@src/data/shortcuts";
import history from             "@src/data/history";
import { useRouter } from "expo-router";

var alertDeleteShorcut = (onConfirm = ()=>{}, onCancel = ()=>{})=> {
    Alert.alert(
        "Delete shortcut",
        "Are you sure you want to delete this shortcut?",
        [
            { text: "Delete", onPress: onConfirm, style: "ok" },
            { text: "Cancel", onPress: onCancel, style: "cancel" }
        ]
    )
}

export default function ShortcutStack() {
    const ts = useThemedStyle(tsf);
    const rerender = useRerender();
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();
    const assertUser = useAssertUser()

    const handleShortcutPress = (from, to) => {
        const index = shortcuts.findIndex(s => s.from === from && s.to === to);
        if(deleting) {
            alertDeleteShorcut(
                ()=>(shortcuts.splice(index, 1),rerender()),
                ()=>setDeleting(false)
            );
        } else {
            router.navigate("conversion", {
                baseCurrency: from,
                convertToCurrency: to
            });
            router.navigate({
                pathname: "conversion",
                params: {
                    baseCurrency:      from,
                    convertToCurrency: to
                }
            });
        }
    };

    const handleShortcutEditingPress = () => {
        setDeleting(!deleting);
    }

    return assertUser ?? (
        <View style={[ss.container, ts.container]}>
            <View style={ss.titleSection}>
                <Text style={[ss.title, ts.title]}>Shortcuts</Text>
                <TouchableOpacity onPress={handleShortcutEditingPress}>
                    <Text style={{color: ts.title.color}}>{deleting ? "Done" : "Edit"}</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                horizontal
                style={ss.shortcutList}
                data={shortcuts}
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=> {
                    return (
                        <CurrencyShortcut
                            fromCurrency={item.from}
                            toCurrency={item.to}
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
                data={history}
                renderItem={({item}) => (
                    <HistoryEntry
                        fromCurrency={item.from}
                        toCurrency={item.to}
                        fromAmount={item.fromAmount}
                        toAmount={item.toAmount}
                        rate={item.rate}
                        timestamp={item.timestamp}
                    />
                )}
                keyExtractor={(_, index) => index}
            />
        </View>
    );
}

const ss = StyleSheet.create({
    container: {
        paddingTop: 16,
        flex: 1,
    },
    titleSection: {
        ...CS.Flex.row(16),
        ...CS.padding(0, 12),
        alignItems: 'baseline'
    },
    title: {
        ...CS.Font.bold,
        fontSize: 24,
    },
    shortcutList: {
        paddingRight: 32,
        paddingLeft: 16,
        maxHeight: 120,
        paddingBottom: 24,
    },
    historyList: {
        flex: 1,
        marginTop: 8,
        ...CS.padding(0, 16),
        paddingBottom: 32
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
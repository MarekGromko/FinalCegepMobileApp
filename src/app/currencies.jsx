import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { currencyList } from '../data/currencies';
import { flagsMap } from '../data/flags';
import en from '../i18n/en.json';
import { useThemedStyle, ThemedStyle } from '../hook/useThemedStyle';
import { CS } from '../style/CommonStyle';

export default function CurrenciesPage() {
    const ts = useThemedStyle(tsf);
    const router = useRouter();

    const renderItem = ({ item }) => {
        const name = en.currencies[item.code] ?? item.code;
        
        const countryCode = item.users[0];
        const flag = countryCode ? flagsMap[countryCode] : "🌐";

        return (
            <TouchableOpacity 
                style={[ss.item, ts.item]}
                activeOpacity={0.7}
                onPress={() => {
                    console.log(`Clicked on ${item.code}`);
                    router.push(`/details/${item.code}`); 
                }}
            >
                <View style={[ss.flagContainer, ts.flagContainer]}>
                    <Text style={ss.flag}>{flag}</Text>
                </View>

                {/* Currency Info */}
                <View style={ss.info}>
                    <View style={CS.Flex.row(8)}>
                        <Text style={[CS.Font.bold, ts.text]}>{item.code}</Text>
                        <Text style={[CS.Font.bold, ts.primary]}>{item.sign}</Text>
                    </View>
                    <Text 
                        style={[CS.Font.regular, ts.textDim, ss.name]}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[ss.page, ts.page]}>
            <FlatList
                data={currencyList}
                keyExtractor={(item) => item.code}
                renderItem={renderItem}
                contentContainerStyle={ss.listContent}
            />
        </View>
    );
}

const ss = StyleSheet.create({
    page: {
        flex: 1,
    },
    listContent: {
        ...CS.padding(16),
        gap: 12,
    },
    item: {
        ...CS.Flex.row(16),
        alignItems: 'center',
        ...CS.padding(16),
        borderRadius: 16,
        borderWidth: 1,
    },
    flagContainer: {
        ...CS.Flex.centeredColumn(),
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    flag: {
        fontSize: 28,
    },
    info: {
        flex: 1,
        ...CS.Flex.column(4),
    },
    name: {
        textTransform: 'capitalize',
        fontSize: 14,
    }
});

const tsf = ThemedStyle((theme) => ({
    page: {
        backgroundColor: theme.background,
    },
    item: {
        backgroundColor: theme.backgroundPanel,
        borderColor: theme.backgroundCard,
    },
    flagContainer: {
        backgroundColor: theme.background, 
    },
    text: {
        color: theme.text,
    },
    textDim: {
        color: theme.textDim,
    },
    primary: {
        color: theme.primary,
    }
}));
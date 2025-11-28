import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { currencyList } from '../../data/currencies';
import { flagsMap } from '../../data/flags';
import en from '../../i18n/en.json';
import { useThemedStyle, ThemedStyle } from '../../hook/useThemedStyle';
import { CS } from '../../style/CommonStyle';
import { Ionicons } from '@expo/vector-icons';

const getCurrencyDetails = (code) => currencyList.find(c => c.code === code);

export default function CurrencyDetailsScreen() {
    const { code } = useLocalSearchParams();
    const ts = useThemedStyle(tsf);
    
    const currency = getCurrencyDetails(code);

    if (!currency) {
        return (
            <View style={[ss.page, ts.page, CS.Flex.centeredColumn()]}>
                <Text style={[ts.text, CS.Font.bold]}>Currency not found: {code}</Text>
            </View>
        );
    }

    const name = en.currencies[currency.code] ?? currency.code;
    const countryFlags = currency.users.map(countryCode => flagsMap[countryCode] || '❓');

    return (
        <View style={[ss.page, ts.page]}>
            <ScrollView contentContainerStyle={ss.container}>
                <View style={[ss.headerCard, ts.card]}>
                    <Text style={[ss.currencyCode, CS.Font.bold, ts.primary]}>{currency.code}</Text>
                    <Text style={[ss.currencyName, CS.Font.light, ts.text]}>{name}</Text>
                    <Text style={[ss.currencySign, CS.Font.regular, ts.textDim]}>({currency.sign})</Text>
                </View>
                <View style={[ss.detailCard, ts.card]}>
                    <Text style={[ss.detailTitle, CS.Font.medium, ts.text]}>Countries Using This Currency</Text>
                    <View style={ss.flagsGrid}>
                        {countryFlags.map((flag, index) => (
                            <View key={index} style={ss.flagItem}>
                                <Text style={ss.flagText}>{flag}</Text>
                            </View>
                        ))}
                    </View>
                    {currency.users.length === 0 && (
                        <Text style={[CS.Font.regular, ts.textDim, CS.margin(10, 0)]}>
                            No specific countries listed (e.g., precious metals, virtual currencies).
                        </Text>
                    )}
                </View>

                <TouchableOpacity style={[ss.detailCard, ts.card, ss.conversionButton]}>
                     <View style={CS.Flex.centeredRow(10)}>
                        <Ionicons name="swap-horizontal" size={24} color={ts.primary.color} />
                        <Text style={[CS.Font.bold, ts.primary, ss.conversionText]}>
                            Calculate Conversion Rate
                        </Text>
                     </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const ss = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        ...CS.padding(20),
        ...CS.Flex.column(20),
    },
    headerCard: {
        ...CS.padding(30),
        borderRadius: 20,
        ...CS.Flex.centeredColumn(10),
    },
    currencyCode: {
        fontSize: 48,
        letterSpacing: 2,
    },
    currencyName: {
        fontSize: 22,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    currencySign: {
        fontSize: 18,
    },
    detailCard: {
        ...CS.padding(20),
        borderRadius: 16,
    },
    detailTitle: {
        fontSize: 18,
        ...CS.margin(0, 0, 10, 0),
    },
    flagsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    flagItem: {
        ...CS.Flex.centeredColumn(),
        padding: 5,
        height: 40,
    },
    flagText: {
        fontSize: 30,
    },
    conversionButton: {
        borderWidth: 2,
        borderStyle: 'dashed',
        ...CS.Flex.centeredColumn(),
    },
    conversionText: {
        fontSize: 18,
    }
});

const tsf = ThemedStyle((theme) => ({
    page: {
        backgroundColor: theme.background,
    },
    card: {
        backgroundColor: theme.backgroundPanel,
        borderColor: theme.primaryShade,
    },
    text: {
        color: theme.text,
    },
    textDim: {
        color: theme.textDim,
    },
    primary: {
        color: theme.primary,
        borderColor: theme.primary, 
    }
}));
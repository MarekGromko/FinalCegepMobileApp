import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SearchbarComponent from '@src/component/SearchComponent';
import { useThemedStyle, ThemedStyle } from '@src/hook/useThemedStyle';
import { CS } from '@src/style/CommonStyle';
import { currencyList } from '@src/data/currencies';
import { flagsMap } from '@src/data/flags';
import { assertUser } from '@src/hook/useUser';
import en from '@src/i18n/en.json';

const stylesFactory = ThemedStyle((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        ...CS.Flex.column(0),
    },
    headerSection: {
        ...CS.Flex.column(24),
        ...CS.padding(24),
    },
    headerRow: {
        ...CS.Flex.row(2),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchbarContainer: {
        flex: 1,
        marginRight: 10,
    },
    searchbar: {
        backgroundColor: theme.backgroundPanel,
        borderRadius: 24,
        ...CS.padding(2),
    },
    searchbarInput: {
        color: theme.text
    },
    searchbarIconColor: theme.primary,
    searchbarPlaceHolder:  theme.text,
    
    
    resultsContainer: {
        flex: 1,
    },
    resultItem: {
        backgroundColor: theme.backgroundPanel,
        borderColor: theme.backgroundCard,
        ...CS.padding(16),
    },
    flagContainer: {
        backgroundColor: theme.background,
    },
    resultText: {
        color: theme.text,
    },
    resultTextDim: {
        color: theme.textDim,
    },
    resultPrimary: {
        color: theme.primary,
    },
}));

export default function Search() {
    const styles = useThemedStyle(stylesFactory);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    if(!assertUser()) return null;

    const filteredCurrencies = searchQuery.trim() === '' 
        ? currencyList 
        : currencyList.filter(item => 
            item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (en.currencies[item.code] && en.currencies[item.code].toLowerCase().includes(searchQuery.toLowerCase()))
          );

    const displayResultItem = ({ item }) => {
        const name = en.currencies[item.code] ?? item.code;
        const countryCode = item.users[0];
        const flag = countryCode ? flagsMap[countryCode] : "🌐";

        return (
            <TouchableOpacity 
                style={[ss.item, { backgroundColor: styles.resultItem.backgroundColor, borderColor: styles.resultItem.borderColor }]}
                activeOpacity={0.7}
                onPress={() => {
                    console.log(`Clicked on ${item.code}`);
                    router.push(`/details/${item.code}`);
                }}
            >
                <View style={[ss.flagContainer, { backgroundColor: styles.flagContainer.backgroundColor }]}>
                    <Text style={ss.flag}>{flag}</Text>
                </View>

                <View style={ss.info}>
                    <View style={CS.Flex.row(8)}>
                        <Text style={[CS.Font.bold, { color: styles.resultText.color }]}>{item.code}</Text>
                        <Text style={[CS.Font.bold, { color: styles.resultPrimary.color }]}>{item.sign}</Text>
                    </View>
                    <Text 
                        style={[CS.Font.regular, { color: styles.resultTextDim.color }, ss.name]}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    if(!assertUser()) return null;

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <View style={styles.headerRow}>
                    <View style={styles.searchbarContainer}>
                        <SearchbarComponent
                            style={styles.searchbar}
                            inputStyle={styles.searchbarInput}
                            iconColor={styles.searchbarIconColor}
                            placeHolderColor={styles.searchbarPlaceHolder}
                            onSearchChange={setSearchQuery}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.resultsContainer}>
                <FlatList
                    data={filteredCurrencies}
                    keyExtractor={(item) => item.code}
                    renderItem={displayResultItem}
                    contentContainerStyle={ss.listContent}
                    scrollEnabled={true}
                />
            </View>
        </View>
    );
}

const ss = StyleSheet.create({
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
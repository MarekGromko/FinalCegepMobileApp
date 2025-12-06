import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedStyle, useThemedStyle } from '../hook/useThemedStyle';
import { CS } from '../style/CommonStyle';
import { currencyMap } from '@src/data/currencies';
import { flagsMap } from '@src/data/flags';

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
};

const formatAmount = (amount) => {
    return amount.toLocaleString({
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

/**
 * A component to display a single conversion history entry
**/
export default function HistoryEntry({ 
    fromCurrency, 
    toCurrency, 
    fromAmount,
    toAmount,
    rate,
    timestamp,
}) {
    const ts = useThemedStyle(tsf);
    const fromSign  = currencyMap[fromCurrency].sign;
    const toSign    = currencyMap[toCurrency].sign;
    const fromFlag  = flagsMap[currencyMap[fromCurrency].users[0]] ?? '🌐';
    const toFlag    = flagsMap[currencyMap[toCurrency].users[0]] ?? '🌐';
    return (
        <View 
            style={[ss.container, ts.container]}
        >
            <View style={ss.topSection}>
                {/* Left Section - From Currency */}
                <View style={ss.leftSection}>
                    <View style={ss.currencyRow}>
                        <Text style={ss.flag}>{fromFlag}</Text>
                        <Text style={[ss.amount, ts.amount]}>
                            {formatAmount(fromAmount)} {fromSign}
                        </Text>
                    </View>
                    <Text style={[ss.currencyCode, ts.currencyCode]}>{fromCurrency}</Text>
                </View>

                {/* Center - Arrow */}
                <Ionicons color={ts.arrow.color} size={32} name="arrow-forward" />

                {/* Right Section - To Currency */}
                <View style={ss.rightSection}>
                    <View style={ss.currencyRow}>
                        <Text style={ss.flag}>{toFlag}</Text>
                        <Text style={[ss.amount, ts.amount]}>
                            {formatAmount(toAmount)} {toSign}
                        </Text>
                    </View>
                    <Text style={[ss.currencyCode, ts.currencyCode]}>{toCurrency}</Text>
                </View>
            </View>
            {/* Bottom - Rate and Timestamp */}
            <View style={ss.footer}>
                <Text style={[ss.rate, ts.rate]}>
                    1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                </Text>
                <Text style={[ss.timestamp, ts.timestamp]}>
                    {formatTimestamp(timestamp)}
                </Text>
            </View>
        </View>
    );
}

const ss = StyleSheet.create({
    container: {
        ...CS.Flex.column(),
        ...CS.padding(16, 18),
        borderRadius: 12,
        minHeight: 90,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        margin: 12,
        marginBottom: 8
    },
    topSection: {
        ...CS.Flex.row(),
        justifyContent: 'space-between',
    },
    leftSection: {
        ...CS.Flex.centeredColumn(4),
        alignItems: 'flex-start',
    },
    rightSection: {
        ...CS.Flex.centeredColumn(4),
        alignItems: 'flex-end',
    },
    currencyRow: {
        ...CS.Flex.centeredRow(8),
    },
    flag: {
        fontSize: 20,
    },
    amount: {
        ...CS.Font.bold,
        fontSize: 18,
    },
    currencyCode: {
        ...CS.Font.bold,
        fontSize: 12,
        letterSpacing: 0.5,
    },
    arrowContainer: {
        ...CS.Flex.centered,
        position: 'absolute',
        top: 16,
        left: '50%',
        marginLeft: -12,
    },
    arrow: {
        fontSize: 20,
    },
    footer: {
        ...CS.Flex.centeredRow(12),
        ...CS.margin(12, 0, 0, 0),
        paddingTop: 12,
        justifyContent: 'space-between',
        width: '100%',
    },
    rate: {
        fontSize: 11,
        ...CS.Font.light,
    },
    timestamp: {
        fontSize: 11,
        ...CS.Font.light,
    },
});

const tsf = ThemedStyle((theme) => ({
    container: {
        backgroundColor: theme.backgroundPanel,
        borderWidth: 1,
        borderColor: theme.backgroundCard,
    },
    amount: {
        color: theme.text,
    },
    currencyCode: {
        color: theme.textDim,
    },
    arrow: {
        color: theme.primary,
    },
    rate: {
        color: theme.textDim,
    },
    timestamp: {
        color: theme.textDim,
    },
}));
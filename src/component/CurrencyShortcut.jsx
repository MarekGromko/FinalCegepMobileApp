import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { ThemedStyle, useThemedStyle } from '../hook/useThemedStyle';
import { CS } from '../style/CommonStyle';

/**
 * CurrencyShortcut - A single item shortcut component for quick currency conversion
 * 
 * @param {Object} props
 * @param {string} props.fromCurrency - Source currency code
 * @param {string} props.toCurrency - Target currency code
 * @param {string} props.fromSign - Source currency symbol
 * @param {string} props.toSign - Target currency symbol
 * @param {string} props.fromFlag - Source currency flag emoji
 * @param {string} props.toFlag - Target currency flag emoji
 * @param {Function} props.onPress - Callback when the shortcut is pressed
 */
export default function CurrencyShortcut({ 
    fromCurrency, 
    toCurrency,
    fromFlag,
    toFlag,
    deleting,
    onPress 
}) {
    const ts = useThemedStyle(tsf);

    return (
        <TouchableOpacity 
            style={[ss.container, ts.container]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {deleting && <Image style={ss.delete} tintColor={ts.delete.color} source={require('@assets/icons/delete.svg')} />}
            <View style={ss.fromFlag}>
                <Text style={ss.flag}>{fromFlag}</Text>
            </View>
            <View style={ss.toFlag}>
                <Text style={ss.flag}>{toFlag}</Text>
            </View>
            <Image style={ss.arrow} tintColor={ts.arrow.color} source={require('@assets/icons/curved-arrow.svg')}/>


            <View style={ss.labels}>
                <Text style={[ss.code, ts.code]}>{fromCurrency}</Text>
                <Text style={[ts.codeArrow]}>→</Text>
                <Text style={[ss.code, ts.code]}>{toCurrency}</Text>
            </View>
        </TouchableOpacity>
    );
}

const ss = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: 90,
        height: 80,
        borderRadius: 16,
        margin: 8,
        marginBottom: 12,
    },
    currencySection: {
        ...CS.Flex.centeredRow(4),
    },
    delete: {
        position: 'absolute',
        width: 32,
        left: 64,
        top: -8,
        height: 32,
        zIndex: 2
    },
    flag: {
        position: 'absolute',
        top: -28,
        left: -16,
        fontSize: 32,
        zIndex: 1
    },
    arrow: {
        position: 'absolute',
        top: 40,
        left: 8,
        width: 30,
        height: 30,
        transform: [{ rotate: '-80deg' }, { scaleX: -1 }],
    },
    labels: {
        ...CS.Flex.centeredRow(4),
        position: 'absolute',
        bottom: -20,
    },
    code: {
        ...CS.Font.bold,
        fontSize: 12
    },
    flag: {
        fontSize: 48,
    },
    fromFlag: {
        position: 'absolute',
        left: 6,
        top: -8,
    },
    toFlag: {
        position: 'absolute',
        left: 36,
        bottom: -10
    }
});

const tsf = ThemedStyle((theme) => ({
    container: {
        backgroundColor: theme.backgroundPanel,
        borderWidth: 1,
        borderColor: theme.backgroundCard,
    },
    arrow: {
        color: theme.backgroundCard,
    },
    code: {
        color: theme.textDim,
    },
    codeArrow: {
        color: theme.primary,
    },
    delete: {
        color: theme.semantic.error
    }
}));

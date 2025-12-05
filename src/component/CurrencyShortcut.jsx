import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedStyle, useThemedStyle } from '../hook/useThemedStyle';
import { CS } from '../style/CommonStyle';
import Animated, { 
    LinearTransition, 
    useSharedValue, 
    ZoomOut, 
    useAnimatedStyle, 
    withTiming, 
    withSequence,
    withRepeat
} from 'react-native-reanimated';
import { useEffect } from 'react';

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
    const wobblingValue = useSharedValue(0);
    useEffect(()=>{
        if(deleting) {
            wobblingValue.value = withRepeat(
                withSequence(
                    withTiming(-2, { duration: 120 }),
                    withTiming(2, { duration: 120 })
                ),
                -1,
                true
            );
        } else {
            wobblingValue.value = withTiming(0, { duration: 100 });
        }
    },[deleting])
    const wobblingStyle = useAnimatedStyle(()=>{
        return {
            transform: [
                { rotate: `${wobblingValue.value}deg` }
            ]
        }
    });
    const ts = useThemedStyle(tsf);
    fromFlag = fromFlag || '🌐';
    toFlag   = toFlag   || '🌐';
    return (
        <Animated.View exiting={ZoomOut.duration(200)} layout={LinearTransition.springify(200)}>
        <Animated.View style={[wobblingStyle]} >
            <TouchableOpacity 
                style={[ss.root]}
                onPress={onPress}
                activeOpacity={0.7}
            >
                {deleting && <Ionicons style={ss.delete} color={ts.delete.color} name="close-circle" size={32} />}
                <View style={[ss.card, ts.card]}>
                    <Text style={ss.flags}>{fromFlag}</Text>
                    <Ionicons name="arrow-redo" size={32} color={ts.arrow.color} style={ss.arrow} />
                    <Text style={ss.flags}>{toFlag}</Text>
                </View>


                <View style={ss.labels}>
                    <Text style={[ss.code, ts.code]}>{fromCurrency}</Text>
                    <Ionicons color={ts.codeArrow.color} name="arrow-forward" />
                    <Text style={[ss.code, ts.code]}>{toCurrency}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
        </Animated.View>
    );
}

const ss = StyleSheet.create({
    root: {
        ...CS.Flex.centeredColumn(4),
        marginTop: 16,
        marginRight: 16
    },
    card: {
        ...CS.Flex.row(8),
        ...CS.padding(4, 6),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    delete: {
        position: 'absolute',
        width: 32,
        right: -12,
        top: -12,
        height: 32,
        zIndex: 2
    },
    arrow: {
        position: 'absolute',
        top: -16,
        zIndex: 1,
        transform: [{ rotate: '30deg' }, { scaleX: 1 }],
    },
    labels: {
        ...CS.Flex.centeredRow(4),
    },
    code: {
        ...CS.Font.bold,
        fontSize: 12
    },
    flags: {
        fontSize: 38,
    }
});

const tsf = ThemedStyle((theme) => ({
    card: {
        backgroundColor: theme.backgroundPanel,
        borderWidth: 1,
        borderColor: theme.backgroundCard,
    },
    arrow: {
        color: theme.priamryDim,
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

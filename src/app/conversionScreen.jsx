import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from "@react-native-picker/picker"
import { convertingCurrency, getConversionRate } from '../components/conversionComponents';
import { currencyList, currencyMap } from '../data/currencies';
import  { flagsMap } from "../data/flags";
import { useThemedStyle, ThemedStyle } from '../hook/useThemedStyle';
import { CS } from '../style/CommonStyle';
//Source picker : https://github.com/react-native-picker/picker

export default function PageConversion() {
    const ts = useThemedStyle(tsf);
    const [ baseCurrency, setBaseCurrency ] = useState("CAD");
    const [ convertToCurrency, setConvertToCurrency] = useState("USD");
    const [ inputValue, setInputValue] = useState(0);
    const [ convertedValue, setConvertedValue] = useState(0);
    const rate = getConversionRate(baseCurrency, convertToCurrency);

    return (
        <SafeAreaProvider style={[ss.page, ts.page]}> 
            <View id='currenciesChoice' style={[ss.choiceCurrencies, ts.container]}>
                <View style={ss.baseCurrencyContainer}>
                    <Picker style={[ss.picker, ts.text, ts.item]} selectedValue={baseCurrency} onValueChange={(itemValue, itemIndex) => setBaseCurrency(itemValue)}>
                        {currencyList.map(item => (
                            <Picker.Item style={{fontSize:20}} label={`${flagsMap[item.users[0]]} ${item.code}`} value={item.code} key={item.code}></Picker.Item>
                        ))}
                    </Picker>
                </View>

                <View>
                    <Text style={[CS.Font.light, ss.toText, ts.text ]}> To </Text>
                </View>
                <View style={ss.convertToCurrencyContainer}>
                    <Picker style={[ts.text, ts.item, ss.picker]} selectedValue={convertToCurrency}  onValueChange={(itemValue, itemIndex) => setConvertToCurrency(itemValue)}>
                        {currencyList.map(item => (
                            <Picker.Item style={{fontSize:20}} label={`${flagsMap[item.users[0]]} ${item.code}`} value={item.code} key={item.code}></Picker.Item>
                        ))}
                    </Picker>
                </View>
            </View>
            <View id='values' style={[ts.container]}>
                <View  >
                    <View id='userInput' style={ss.userInput}>
                        <TextInput style={[ss.textInput, ts.text, ts.item,ss.item]} placeholder='Insert the amount to convert' placeholderTextColor={ts.text.color} inputMode='decimal' maxLength={10} onChangeText={setInputValue}></TextInput>
                        <TouchableOpacity style={[ts.item,ss.touchableOpacity, ts.primary]} activeOpacity={0.7} onPress={() => setConvertedValue(convertingCurrency(rate, inputValue))}>
                        <Text style={[ts.primary, ss.item]}>Enter</Text>
                    </TouchableOpacity>
                    </View>
                    <View id='informationOutput' style={ss.informationOutput}>
                        <Text style={[CS.Font.light, ts.text, ts.item, ss.item]}>Rate : {rate}</Text>
                        <Text style={[CS.Font.light, ts.item, ss.item, ts.primaryShade]}>{currencyMap[convertToCurrency].sign}{convertedValue}</Text>
                    </View>
                    
                </View>
            </View>
        </SafeAreaProvider>
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
        ...CS.Flex.column(16),
        alignItems: 'center',
        ...CS.padding(16),
        textTransform:"uppercase",
        fontWeight: "bold",
    },
    toText: {
        textAlign:"center",
        textTransform:'uppercase',
        fontWeight:"bold",
        fontSize:30,
        marginTop:15, 
        borderRadius:2,
    },
    picker: {
        fontSize: 20,
        borderRadius:5,
        borderStyle:"solid",
        fontWeight:"bold",
        ...CS.padding(5),
        width:150,
    },

    choiceCurrencies: {
        ...CS.Flex.row(20),
        marginTop:20,
        marginBottom:20,
        padding:50,
        width: "fit-content",
        justifyContent:"center",
    },
    touchableOpacity: {
        borderWidth:2,
        borderStyle:"dashed",
    },
    userInput: {
        ...CS.Flex.row(10),
        width:400,
        marginTop:20,
        justifyContent:"center",

    }, 
    informationOutput: {
        ...CS.Flex.row(10),
        ...CS.padding(16),
        marginTop:20,
        justifyContent:"center",
    },
    name: {
        textTransform: 'capitalize',
        fontSize: 14,
    },
    textInput: {
        ...CS.padding(5),
        width:250,
        borderStyle:"solid",
        borderWidth: 2,    
    },
});

const tsf = ThemedStyle((theme) => ({

    page: {
        backgroundColor: theme.background,
    },
    item: {
        backgroundColor: theme.backgroundPanel,
        borderColor: theme.backgroundCard,
    },
    container: {
        backgroundColor: theme.backgroundCard, 
    },
    text: {
        color: theme.text,
    },
    textDim: {
        color: theme.textDim,
    },
    primary: {
        color: theme.primary,
        borderColor: theme.primary
    },
    primaryShade: {
        color: theme.primaryShade,
    },
}));
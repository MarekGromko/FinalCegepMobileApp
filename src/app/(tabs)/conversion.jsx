import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from "@react-native-picker/picker"
import { convertingCurrency, getConversionRate } from '@src/component/conversionComponents';
import { currencyList, currencyMap } from '@src/data/currencies';
import { flagsMap } from "@src/data/flags";
import { useThemedStyle, ThemedStyle } from '@src/hook/useThemedStyle';
import { CS } from '@src/style/CommonStyle';
import { assertUser } from '@src/hook/useUser';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
//Source picker : https://github.com/react-native-picker/picker

export default function PageConversion() {
    const ts = useThemedStyle(tsf);
    const [ baseCurrency, setBaseCurrency ] = useState("CAD");
    const [ convertToCurrency, setConvertToCurrency] = useState("USD");
    const [ inputValue, setInputValue] = useState(0);
    const [ convertedValue, setConvertedValue] = useState(0);
    const rate = getConversionRate(baseCurrency, convertToCurrency);
    
    //if(!assertUser()) return null;
    // added so that you can pass a base and convert currency as parameter to the root
    const { 
        baseCurrency: paramBaseCurrency, 
        convertToCurrency: paramConvertToCurrency
    } = useLocalSearchParams()
    useEffect(()=>{
        setBaseCurrency(paramBaseCurrency ?? "CAD");
        setConvertToCurrency(paramConvertToCurrency ?? "USD");
    }, [paramBaseCurrency, paramConvertToCurrency]);

    
    return (
        <SafeAreaProvider style={[ss.page, ts.page]}> 
            <View id='currenciesChoice' style={[ss.boxes, ts.container]}>
                <View style={[ss.pickerView, ts.container]}>
                    <Picker style={[ss.picker, ts.text, ts.item]} selectedValue={baseCurrency} onValueChange={(itemValue, itemIndex) => setBaseCurrency(itemValue)}>
                        {currencyList.map(item => (
                            <Picker.Item style={{fontSize:20}} label={`${flagsMap[item.users[0]]} ${item.code}`} value={item.code} key={item.code}></Picker.Item>
                        ))}
                    </Picker>
                </View>

                <View style={ss.arrow}>
                    <Ionicons color={ts.primary.color} size={50} name="arrow-forward" />
                </View>
                <View style={[ss.pickerView, ts.container]}>
                    <Picker style={[ts.text, ts.item, ss.picker]} selectedValue={convertToCurrency}  onValueChange={(itemValue, itemIndex) => setConvertToCurrency(itemValue)}>
                        {currencyList.map(item => (
                            <Picker.Item style={{fontSize:20}} label={`${flagsMap[item.users[0]]} ${item.code}`} value={item.code} key={item.code}></Picker.Item>
                        ))}
                    </Picker>
                </View>
            </View>
            <View id='values' style={[ts.container, ss.boxes]}>
                <View  >
                    <View id='userInput' style={ss.userInput}>
                        <TextInput style={[ss.textInput, ts.text, ts.item,ss.item]} placeholder='Insert the amount to convert' placeholderTextColor={ts.text.color} inputMode='decimal' maxLength={10} onChangeText={setInputValue}></TextInput>
                        <TouchableOpacity style={[ts.item,ss.touchableOpacity, ts.primary]} activeOpacity={0.7} onPress={() => setConvertedValue(convertingCurrency(rate, inputValue))}>
                        <Text style={[ts.primary, ss.item]}>Enter</Text>
                    </TouchableOpacity>
                    </View>
                    <View id='informationOutput' style={ss.informationOutput}>
                        <Text style={[CS.Font.light, ts.item, ss.item]}>Rate : {rate}</Text>
                        <Text style={[CS.Font.light, ts.item, ss.item, ts.primaryShade ]}>{currencyMap[convertToCurrency].sign}{convertedValue}</Text>
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
        fontWeight:"bold",
        ...CS.padding(5),
        width:150,
    },
    pickerView: {
        borderStyle:"solid",
        borderWidth:2,
        borderRadius:0,
    },
    boxes: {
        marginTop:25,
        marginBottom:20,
        justifyContent:"center",
        ...CS.Flex.row(16),
        alignItems: 'center',
        ...CS.padding(15),
        borderRadius: 12,
    },
    touchableOpacity: {
        borderStyle:"solid",
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
    arrow: {
        ...CS.margin(5)
    },
});

const tsf = ThemedStyle((theme) => ({

    page: {
        backgroundColor: theme.background,
    },
    item: {
        backgroundColor: theme.backgroundCard,
        borderColor: theme.backgroundPanel,
        borderWidth:1,
        borderRadius:5,
    },
    container: {
        backgroundColor: theme.backgroundPanel,
        borderColor: theme.backgroundCard,
        borderWidth:1,
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
        borderColor: theme.primaryShade,
    },
}));
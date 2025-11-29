import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Picker } from "@react-native-picker/picker"
import { convertingCurrency, getConversionRate } from '../components/conversionComponents';
import { currencyList } from '../data/currencies';
import  { flagsMap } from "../data/flags";

//Source picker : https://github.com/react-native-picker/picker

export default function PageConversion() {
    const [ baseCurrency, setBaseCurrency ] = useState("CAD");
    const [ convertToCurrency, setConvertToCurrency] = useState("USD");
    const [ inputValue, setInputValue] = useState(0);
    const [ convertedValue, setConvertedValue] = useState(0);
    const rate = getConversionRate(baseCurrency, convertToCurrency);

    return (
        <View> 
            <View id='currenciesChoice'>
                <View>
                    <Picker selectedValue={baseCurrency} onValueChange={(itemValue, itemIndex) => setBaseCurrency(itemValue)}>
                        {currencyList.map(item => (
                            <Picker.Item label={`${flagsMap[item.users[0]]} ${item.code}`} value={item.code} key={item.code}></Picker.Item>
                        ))}
                    </Picker>
                </View>

                <View>
                    <Text> To </Text>
                </View>
                <View>
                    <Picker selectedValue={convertToCurrency}  onValueChange={(itemValue, itemIndex) => setConvertToCurrency(itemValue)}>
                        {currencyList.map(item => (
                            <Picker.Item label={`${flagsMap[item.users[0]]} ${item.code}`} value={item.code} key={item.code}></Picker.Item>
                        ))}
                    </Picker>
                </View>
            </View>
            <View id='values'>
                <View>
                    <View>
                        <TextInput placeholder='Insert the amount to convert' inputMode='decimal' maxLength={10} onChangeText={setInputValue}></TextInput>
                        <TouchableOpacity onPress={() => setConvertedValue(convertingCurrency(rate, inputValue))}>
                        <Text>Enter</Text>
                    </TouchableOpacity>
                </View>
                    <Text>Rate : {rate}</Text>
                    <Text>{convertedValue}</Text>
                </View>
            </View>
        </View>
    );
}

import React, { useState, useEffect } from 'react';
import { axios } from "axios";
const getConversionRate = (defaultCurrency, changeToCurrency) => {
    const [conversionRate, setConversionRate] = useState([]);
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://api.fxratesapi.com/latest?base=${defaultCurrency}&currencies=${changeToCurrency}&resolution=1m&format=json`);
            setConversionRate(response.data.rates);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    return conversionRate
}

const convertingCurrency = (defaultCurrency, changeToCurrency, value) => {
    let conversionRate = getConversionRate(defaultCurrency, changeToCurrency)
    let convertedValue =  (value * conversionRate)
    return convertedValue
}

export { convertingCurrency, getConversionRate }
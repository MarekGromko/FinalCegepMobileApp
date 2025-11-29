import React, { useState, useEffect } from 'react';
import axios from "axios";

export function getConversionRate (baseCurrency, convertToCurrency)  {
    const [conversionRate, setConversionRate] = useState(0);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://api.fxratesapi.com/latest?base=${baseCurrency}&currencies=${convertToCurrency}&resolution=1m&format=json`);
          setConversionRate(response.data.rates[convertToCurrency]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    fetchData();
    }, [baseCurrency, convertToCurrency]);
  return conversionRate
}

export function convertingCurrency(rate, value) {
  if (!rate) {
    return 0;
  }
  return (value * rate)
};
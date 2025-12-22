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
         //Si limite de l'API est atteinte, on randomize... -10 points for Slytherin
         // setConversionRate(Math.ceil((Math.random() * 2) * 10000) / 10000)
        }
      };
    fetchData();
    }, [baseCurrency, convertToCurrency]);
  return conversionRate
};

export function convertingCurrency(rate, value) {
  if (!rate) {
    return 0;
  }
  value = value * rate
  let roundedUpValue = Math.ceil(value * 100) / 100
  return roundedUpValue
};
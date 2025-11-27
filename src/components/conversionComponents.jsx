import React, { useState, useContext } from 'react';

const getConversionRate = (defaultCurrency, changeToCurrency) => {
    //API CALL
    let conversionRate
    return conversionRate
}

const convertingCurrency = (defaultCurrency, changeToCurrency, value) => {
    let conversionRate = getConversionRate(defaultCurrency, changeToCurrency)
    let convertedValue =  (value * conversionRate)
    return convertedValue + " " + changeToCurrency
}

export { convertingCurrency, getConversionRate }
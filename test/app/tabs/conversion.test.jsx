import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PageConversion from '@src/app/(tabs)/conversion';

// -- mocks --
// hooks
jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(() => ({
        baseCurrency: "CAD",
        convertToCurrency:"USD",
    })),
}));
jest.mock('@src/hook/useThemedStyle', () => ({
    useThemedStyle: jest.fn(() => ({
        page: {},
        container: {},
        item: {},
        text: {},
        primary: { color:"red"},
        primaryShade: {},
    })),
    ThemedStyle: jest.fn((fn) => fn),
}));
jest.mock('@src/hook/useUser', () => ({
    useAssertUser: jest.fn(() => null),
}));
// comps
jest.mock('@src/component/conversionComponents', () => ({
    getConversionRate: jest.fn(() => 1.67),
    convertingCurrency: jest.fn((rate, value) => rate * value),
}));
jest.mock("react-native-safe-area-context", () => {
    const React = require("react");
    return {
        SafeAreaProvider: ({children}) => children,
    }
})
// picker
jest.mock("@react-native-picker/picker", () => {
    const React = require("react");

    const Picker =  ({children}) => children;
    Picker.Item = () => null;

    return {Picker};
});
jest.mock("@expo/vector-icons", () => ({
    Ionicons: () => null,
}));


// -- tests --
describe('Page de conversion test', () => {
    it('should render the conversion page', () => {
        const { getByText } = render(<PageConversion />);

        expect(getByText('Rate : 1.67')).toBeTruthy();
    });

    it('should convert the value when pressing the button', () => {

        const { getByPlaceholderText, getByText } = render(<PageConversion />);

        const fakeUserInput = getByPlaceholderText('Insert the amount to convert');
        fireEvent.changeText(fakeUserInput, "50");

        const fakeButton = getByText("Enter");
        fireEvent.press(fakeButton);

        expect(getByText('$83.5')).toBeTruthy();
    });
});

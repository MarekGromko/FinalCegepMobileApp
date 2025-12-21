import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PageConversion from '@src/app/(tabs)/conversion';
import { getConversionRate } from '@src/component/conversionComponents';
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
    getConversionRate: jest.fn(),
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
    const {View, Text, TouchableOpacity} = require("react-native")

    const Picker =  ({selectedValue, onValueChange, children}) => (
        <View>
            {React.Children.map(children, (child) => 
                React.cloneElement(child, {onValueChange})
            )}
        </View>
    );
    Picker.Item = ({label, value, onValueChange}) => (
        <TouchableOpacity onPress={() => onValueChange(value)}>
            <Text>{label}</Text>
        </TouchableOpacity>        
    );

    return {Picker};
});
jest.mock("@expo/vector-icons", () => ({
    Ionicons: () => null,
}));
//mock I18n
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n : {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));


// -- tests --
describe('Page de conversion test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should render the conversion page', () => {
        getConversionRate.mockReturnValue(1.67);

        const { getByText } = render(<PageConversion />);

        expect(getByText('conversion:rate : 1.67')).toBeTruthy();
    });

    it('should convert the value when pressing the button', () => {
        getConversionRate.mockReturnValue(1.67);

        const { getByPlaceholderText, getByText } = render(<PageConversion />);

        const fakeUserInput = getByPlaceholderText('conversion:insertTheAmountToConvert');
        fireEvent.changeText(fakeUserInput, "50");

        const fakeButton = getByText("conversion:enter");
        fireEvent.press(fakeButton);

        expect(getByText('$83.5')).toBeTruthy();
    });

    it("should update the rate when the user changes the currencies", async () => {
        const {getByText, getAllByText, rerender} = render(<PageConversion />);
        getConversionRate.mockReturnValueOnce(1.67).mockReturnValueOnce(0.85);



        expect(getByText("conversion:rate : 1.67")).toBeTruthy();
        const usdPickerSelection = getAllByText("🇺🇸 USD")[0];
        fireEvent.press(usdPickerSelection);
        rerender(<PageConversion />);
        await waitFor(() => {
            expect(getByText("conversion:rate : 0.85")).toBeTruthy();
        });
    });
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ShortcutStack from '@src/app/(tabs)/history';
import shortcuts from '@src/data/shortcuts';

// -- mocks --
const mockNavigate = jest.fn();
const mockRerender = jest.fn();

// hooks

jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({
        navigate: mockNavigate,
    })),
}));
jest.mock('@src/hook/useThemedStyle', () => ({
    useThemedStyle: jest.fn(() => ({
        container: {},
        title: { color: '#000' },
    })),
    ThemedStyle: jest.fn((fn) => fn),
}));
jest.mock('@src/hook/useUser', () => ({
    useAssertUser: jest.fn(() => null),
}));
jest.mock('@src/hook/useRerender', () => ({
    useRerender: jest.fn(() => mockRerender),
}));
// comps
jest.mock('@src/component/HistoryEntry', () => 'HistoryComps');
jest.mock('@src/component/CurrencyShortcut', () => {
    const { TouchableOpacity } = require('react-native');
    return function MockShortcut({ fromCurrency, toCurrency, onPress }) {
        return (
            <TouchableOpacity testID={`shortcut-${fromCurrency}-${toCurrency}`} onPress={onPress}>
                {/* cuze it needs to be pressed :) */}
            </TouchableOpacity>
        );
    };
});

// Mock Alert
jest.spyOn(Alert, 'alert');

// -- tests --
describe('history test suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockNavigate.mockClear();
        mockRerender.mockClear();
        Alert.alert.mockClear();
    });

    it('should render the component', () => {
        const { getByText } = render(<ShortcutStack />);

        expect(getByText('Shortcuts')).toBeTruthy();
        expect(getByText('History')).toBeTruthy();
        expect(getByText('Edit')).toBeTruthy();
    });

    it('should toggle between edit -> done', () => {
        // arrange
        const { getByText } = render(<ShortcutStack />);

        // act
        const editButton = getByText('Edit');
        fireEvent.press(editButton);

        // assert
        expect(getByText('Done')).toBeTruthy();
    });

    it('should toggle back from done -> edit', () => {
        // arrange
        const { getByText } = render(<ShortcutStack />);
        const editButton = getByText('Edit');
        fireEvent.press(editButton);

        // act
        const doneButton = getByText('Done');
        fireEvent.press(doneButton);

        // assert
        expect(getByText('Edit')).toBeTruthy();
    });

    it('should render shortcuts from data', () => {
        const { getByTestId } = render(<ShortcutStack />);
        shortcuts.forEach((shortcut) => {
            const shortcutElement = getByTestId(`shortcut-${shortcut.from}-${shortcut.to}`);
            expect(shortcutElement).toBeTruthy();
        });
    });

    it('should navigate to conversion when shortcuts press', () => {
        // arrange
        const { getByTestId } = render(<ShortcutStack />);
        const firstShortcut = shortcuts[0];
        const shortcutElement = getByTestId(`shortcut-${firstShortcut.from}-${firstShortcut.to}`);

        // act
        fireEvent.press(shortcutElement);

        // assert
        expect(mockNavigate).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith(
            expect.objectContaining({
                pathname: 'conversion',
                params: {
                    baseCurrency: firstShortcut.from,
                    convertToCurrency: firstShortcut.to,
                },
            })
        );
    });

    it('should show delete alert when shortcut press in edit mode', () => {
        // arrange
        const { getByText, getByTestId } = render(<ShortcutStack />);

        // act
        const editButton = getByText('Edit');
        fireEvent.press(editButton);
        const firstShortcut = shortcuts[0];
        const shortcutElement = getByTestId(`shortcut-${firstShortcut.from}-${firstShortcut.to}`);
        fireEvent.press(shortcutElement);

        // assert
        expect(Alert.alert).toHaveBeenCalledWith(
            'Delete shortcut',
            'Are you sure you want to delete this shortcut?',
            expect.arrayContaining([
                expect.objectContaining({ text: 'Delete', style: 'ok' }),
                expect.objectContaining({ text: 'Cancel', style: 'cancel' }),
            ])
        );
    });

    it('should delete shortcut when confirmed in alert', () => {
        
        const { getByText, getByTestId } = render(<ShortcutStack />);
        const initialShortcutsLength = shortcuts.length;

        // act
        const editButton = getByText('Edit');
        fireEvent.press(editButton);
        const shortcutElement = getByTestId(`shortcut-USD-EUR`);
        fireEvent.press(shortcutElement);

        // assert
        const alertCall = Alert.alert.mock.calls[0];
        const deleteCallback = alertCall[2][0].onPress;
        deleteCallback();
        expect(mockRerender).toHaveBeenCalled();
    });

    it('should not navigate when in edit mode and shortcut press', () => {
        // arrange
        const { getByText, getByTestId } = render(<ShortcutStack />);

        // act
        const editButton = getByText('Edit');
        fireEvent.press(editButton);
        const firstShortcut = shortcuts[0];
        const shortcutElement = getByTestId(`shortcut-${firstShortcut.from}-${firstShortcut.to}`);
        fireEvent.press(shortcutElement);

        // assert
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should display shortcuts and history sections', () => {
        const { getByText } = render(<ShortcutStack />);

        const shortcutsTitle = getByText('Shortcuts');
        const historyTitle = getByText('History');

        expect(shortcutsTitle).toBeTruthy();
        expect(historyTitle).toBeTruthy();
    });
});

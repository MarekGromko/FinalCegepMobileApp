import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ShortcutStack from '@src/app/(tabs)/history';

// -- mocks --
// hooks
jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({
        navigate: jest.fn(),
    })),
}));
jest.mock('@src/hook/useThemedStyle', () => ({
    useThemedStyle: jest.fn(() => ({
        container: {},
        title: {},
    })),
    ThemedStyle: jest.fn((fn) => fn),
}));
jest.mock('@src/hook/useUser', () => ({
    assertUser: jest.fn(() => true),
}));
// comps
jest.mock('@src/component/HistoryEntry', () => 'HistoryComps');
jest.mock('@src/component/CurrencyShortcut', () => 'ShortcutComp');

// -- tests --
describe('history test exemple', () => {
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
});

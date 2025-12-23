import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CurrencyDetailsScreen from "@src/app/details/[code]";
import { currencyList } from "@src/data/currencies";

const mockBack = jest.fn();
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
  }),
  useLocalSearchParams: () => ({
    code: "CAD",
  }),
}));

jest.mock("@src/hook/useThemedStyle", () => ({
  useThemedStyle: jest.fn(() => ({
    page: {},
    card: {},
    text: { color: "#000" },
    textDim: {},
    primary: { color: "#00f" },
  })),
  ThemedStyle: (fn) => fn,
}));

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  return {
    SafeAreaProvider: ({ children }) => children,
  };
});

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("CurrencyDetailsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders currency code and name", () => {
    const { getByText } = render(<CurrencyDetailsScreen />);

    expect(getByText("CAD")).toBeTruthy();
    expect(getByText("canadian dollar")).toBeTruthy();
  });

  it("renders countries using this currency", () => {
    const { getByText } = render(<CurrencyDetailsScreen />);

    expect(getByText("🇨🇦")).toBeTruthy();
  });

  it("renders conversion button", () => {
    const { getByText } = render(<CurrencyDetailsScreen />);

    expect(getByText("details:CalculateConversionRate")).toBeTruthy();
  });

  it("navigates back when back button is pressed", () => {
    const { getByTestId } = render(<CurrencyDetailsScreen />);

    fireEvent.press(getByTestId("back-button"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("navigates to conversion with baseCurrency param", () => {
    const { getByText } = render(<CurrencyDetailsScreen />);

    fireEvent.press(getByText("details:CalculateConversionRate"));

    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: "../(tabs)/conversion",
        params: { baseCurrency: "CAD" },
      })
    );
  });

  it("shows error when currency is not found", () => {
    jest
      .spyOn(require("expo-router"), "useLocalSearchParams")
      .mockReturnValueOnce({ code: "XXX" });

    const { getByText } = render(<CurrencyDetailsScreen />);

    expect(getByText("Currency not found: XXX")).toBeTruthy();
  });
});

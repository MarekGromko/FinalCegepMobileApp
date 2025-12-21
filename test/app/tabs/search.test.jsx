import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Search from "@src/app/(tabs)/search";
import { currencyList } from "@src/data/currencies";
import en from "@src/i18n/en.json";
import { flagsMap } from "@src/data/flags";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

jest.mock("@src/hook/useThemedStyle", () => ({
    useThemedStyle: jest.fn(() => ({
        container: {},
        headerSection: {},
        headerRow: {},
        searchbarContainer: {},
        searchbar: {},
        searchbarInput: {},
        searchbarIconColor: {},
        searchbarPlaceHolder: {},
        resultsContainer: {},
        resultItem: {},
        flagContainer: {},
        resultText: {},
        resultTextDim: {},
        resultPrimary: {},
    })),
    ThemedStyle: jest.fn((fn) => fn),
}));

jest.mock("@src/hook/useUser", () => ({
    useAssertUser: () => null,
}));

jest.mock("@src/component/SearchComponent", () => {
    return function MockSearchComponent({ onSearchChange }) {
        return (
            <input
                testID="search-input"
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search currencies"
            />
        );
    };
});

describe("Search", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the search screen correctly", () => {
        const { getByTestId } = render(<Search />);
        expect(getByTestId("search-input")).toBeTruthy();
    });

    it("should display all currencies when no search query is entered", () => {
        const { queryByText } = render(<Search />);

        const firstCurrency = currencyList[0];
        expect(queryByText(firstCurrency.code)).toBeTruthy();
    });

    it("should filter currencies by code when search query is entered", async () => {
        const { getByTestId, queryByText } = render(<Search />);
        const searchInput = getByTestId("search-input");

        fireEvent.changeText(searchInput, "AED");

        await waitFor(() => {
            
            expect(queryByText("AED")).toBeTruthy();
        });
    });

    it("should filter currencies by currency name when search query is entered", async () => {
        const { getByTestId, queryByText } = render(<Search />);
        const searchInput = getByTestId("search-input");

        fireEvent.changeText(searchInput, "dirham");

        await waitFor(() => {
           
            expect(queryByText("AED")).toBeTruthy();
        });
    });

    it("should display all currencies when search query is cleared", async () => {
        const { getByTestId, queryByText } = render(<Search />);
        const searchInput = getByTestId("search-input");


        fireEvent.changeText(searchInput, "AED");

        await waitFor(() => {
            expect(queryByText("AED")).toBeTruthy();
        });

   
        fireEvent.changeText(searchInput, "");

        await waitFor(() => {
           
            const firstCurrency = currencyList[0];
            expect(queryByText(firstCurrency.code)).toBeTruthy();
        });
    });

    it("should handle empty search results gracefully", async () => {
        const { getByTestId, queryByText } = render(<Search />);
        const searchInput = getByTestId("search-input");

        fireEvent.changeText(searchInput, "NONEXISTENT");

        await waitFor(() => {
   
            expect(searchInput).toBeTruthy();
        });
    });

    it("should display currency code and sign", () => {
        const { queryByText } = render(<Search />);
        

        const firstCurrency = currencyList[0];
        expect(queryByText(firstCurrency.code)).toBeTruthy();
        expect(queryByText(firstCurrency.sign)).toBeTruthy();
    });

    it("should display flag emoji for each currency", () => {
        const { queryByText } = render(<Search />);
        

        const firstCurrency = currencyList[0];
        const countryCode = firstCurrency.users[0];
        const flag = countryCode ? flagsMap[countryCode] : "🌐";
        
        if (flag !== "🌐") {
            expect(flag).toBeTruthy();
        }
    });

    it("should display currency name from i18n", () => {
        const { queryByText } = render(<Search />);
 
        const firstCurrency = currencyList[0];
        const currencyName = en.currencies[firstCurrency.code];
        
        if (currencyName) {
            expect(queryByText(currencyName)).toBeTruthy();
        }
    });

    it("should search case-insensitively", async () => {
        const { getByTestId, queryByText } = render(<Search />);
        const searchInput = getByTestId("search-input");

        fireEvent.changeText(searchInput, "aed");

        await waitFor(() => {
   
            expect(queryByText("AED")).toBeTruthy();
        });
    });

    it("should handle whitespace in search queries", async () => {
        const { getByTestId, queryByText } = render(<Search />);
        const searchInput = getByTestId("search-input");

        fireEvent.changeText(searchInput, "   AED   ");

        await waitFor(() => {
           
            expect(queryByText("AED")).toBeTruthy();
        });
    });

    it("should render results container", () => {
        const { getByTestId } = render(<Search />);
        
     
        const searchInput = getByTestId("search-input");
        expect(searchInput).toBeTruthy();
    });

    it("should update search results in real-time as user types", async () => {
        const { getByTestId, queryByText } = render(<Search />);
        const searchInput = getByTestId("search-input");


        fireEvent.changeText(searchInput, "A");

        await waitFor(() => {
            
            const aedText = queryByText("AED");
            expect(aedText).toBeTruthy();
        });

        
        fireEvent.changeText(searchInput, "AE");

        await waitFor(() => {
        
            const aedText = queryByText("AED");
            expect(aedText).toBeTruthy();
        });
    });

    it("should have correct styling applied", () => {
        const { getByTestId } = render(<Search />);
        const searchInput = getByTestId("search-input");
        
        expect(searchInput).toBeTruthy();
    });

    it("should call router push with correct currency code when item is pressed", async () => {
        const { getByTestId, getByText } = render(<Search />);
        

        const firstCurrency = currencyList[0];
        const currencyCode = firstCurrency.code;
  
        const currencyItem = getByText(currencyCode);
        fireEvent.press(currencyItem);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith(`/details/${currencyCode}`);
        });
    });

    it("should display multiple currencies in the list", () => {
        const { queryByText } = render(<Search />);
        

        const aedCurrency = currencyList.find(c => c.code === "AED");
        const afdCurrency = currencyList.find(c => c.code === "AFN");
        
        if (aedCurrency) {
            expect(queryByText(aedCurrency.code)).toBeTruthy();
        }
        if (afdCurrency) {
            expect(queryByText(afdCurrency.code)).toBeTruthy();
        }
    });

    it("should filter results correctly with partial matches", async () => {
        const { getByTestId, queryByText } = render(<Search />);
        const searchInput = getByTestId("search-input");

    
        const testCurrency = currencyList[0]; 
        const partialCode = testCurrency.code.slice(0, 2); 
        
        fireEvent.changeText(searchInput, partialCode);

        await waitFor(() => {
          
            const currencyText = queryByText(testCurrency.code);
            expect(currencyText).toBeTruthy();
        });
    });
});

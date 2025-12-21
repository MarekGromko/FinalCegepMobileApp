import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "@src/app/login";
import { fakeUser } from "@src/data/fakeUser";



const mockLogIn = jest.fn();
const mockReplace = jest.fn();

jest.mock("@src/hook/useUser", () => ({
    useUser: () => ({
        isLogged: false,
        userId: "",
        userName: "",
        logIn: mockLogIn,
        logOut: jest.fn(),
    }),
}));

jest.mock("expo-router", () => ({
    useRouter: () => ({
        replace: mockReplace,
    }),
}));

jest.mock("@src/hook/useThemedStyle", () => ({
    useThemedStyle: jest.fn(() => ({
        container: {},
        sub_container: {},
        input: {},
        title_02: {},
        btn_01: { backgroundColor: "blue" },
        sub_header_title: {},
    })),
    ThemedStyle: jest.fn((fn) => fn),
}));
global.alert = jest.fn();

// tests 
describe("Login", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the login form correctly", () => {
        const { getByPlaceholderText, getByTestId } = render(<Login />);
        expect(getByPlaceholderText("Enter an Email")).toBeTruthy();
        expect(getByPlaceholderText("Enter a Password")).toBeTruthy();
        expect(getByTestId("login-button")).toBeTruthy();
    });

    it("should login successfully with correct credentials", async () => {
        const { getByPlaceholderText, getByTestId } = render(<Login />);
        const loginButton = getByTestId("login-button");

        fireEvent.changeText(getByPlaceholderText("Enter an Email"), fakeUser.email);
        fireEvent.changeText(getByPlaceholderText("Enter a Password"), fakeUser.password);
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockLogIn).toHaveBeenCalledWith(fakeUser.id, fakeUser.name);
            expect(mockReplace).toHaveBeenCalledWith("/search");
            expect(global.alert).not.toHaveBeenCalled();
        });
    });

    it("should show an alert on login failure with wrong credentials", async () => {
        const { getByPlaceholderText, getByTestId } = render(<Login />);
        const loginButton = getByTestId("login-button");

        fireEvent.changeText(getByPlaceholderText("Enter an Email"), "wrong@test.com");
        fireEvent.changeText(getByPlaceholderText("Enter a Password"), "wrongpass");
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockLogIn).not.toHaveBeenCalled();
            expect(mockReplace).not.toHaveBeenCalled();
            expect(global.alert).toHaveBeenCalledWith("Email ou mot de passe incorrect");
        });
    });
});

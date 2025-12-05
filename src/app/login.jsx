import { useRef, useState } from "react";
import { Text, View, TextInput, Animated } from "react-native";
import { ThemedStyle, useThemedStyle } from "../hook/useThemedStyle";
import users from "../data/users.json";

const AnimatedPressable = Animated.createAnimatedComponent(require("react-native").Pressable);

export default function LoginScreen() {

    const style = useThemedStyle(themedStyles);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === users.user.email && password === users.user.password) {
            console.log("Login réussi !");
        } else {
            console.log("Email ou mot de passe incorrect");
        }
    };

    const scale = useRef(new Animated.Value(1)).current;

    const animatePress = () => {
        Animated.sequence([
            Animated.timing(scale, { toValue: 0.9, duration: 150, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true })
        ]).start();
    };

    return (
        <View style={style.container}>
            <Text style={style.sub_header_title}>Login</Text>

            <View style={style.sub_container}>
                <Text style={style.title_02}>Email</Text>
                <TextInput
                    style={style.input}
                    placeholder="Enter an Email"
                    onChangeText={setEmail}
                    value={email}
                />

                <Text style={style.title_02}>Password</Text>
                <TextInput
                    style={style.input}
                    placeholder="Enter a Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <AnimatedPressable
                    style={[
                        style.btn_01,
                        { transform: [{ scale }] }
                    ]}
                    onPress={() => {
                        animatePress();
                        handleLogin();
                    }}
                >
                    <Text style={{ color: "#000" }}>Login</Text>
                </AnimatedPressable>
            </View>
        </View>
    );
}

const themedStyles = ThemedStyle((theme) => ({
    container: {
        width: 400,
        backgroundColor: theme.blackBackground,
        alignSelf: "center",
        marginTop: "auto",
        marginBottom: "auto",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#D4D7E3",
    },

    sub_header_title: {
        paddingTop: 50,
        color: theme.primary,
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
    },

    title_02: {
        color: theme.primary,
        fontSize: 14,
    },

    sub_container: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 20,
    },

    input: {
        width: "100%",
        height: 42,
        backgroundColor: theme.backgroundCard,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#D4D7E3",
        padding: 13,
        color: theme.text,
    },

    btn_01: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        backgroundColor: theme.primary,
        width: "100%",
        marginTop: 10,
    },
}));

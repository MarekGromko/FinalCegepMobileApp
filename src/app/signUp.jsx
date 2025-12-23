import { use, useState } from "react";
import { Text, View, TextInput, Pressable} from "react-native";
import { ThemedStyle, useThemedStyle } from "../hook/useThemedStyle";
import { CS } from "../style/CommonStyle";

 
 
export default function SignUpPage() {
    const style = useThemedStyle(themedStyles);
   
 
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    return (
        <View style={style.container}>
            <Text style={style.sub_header_title}>Sign Up</Text>
            <View style={style.sub_container}>
                <Text style={style.title_02}>Firstname</Text>
                <TextInput
                    style={style.input}
                    placeholder="Enter a FirstName"
                    onChangeText={(text) => {
                        setFirstname(text)
                    }}
                    value={firstname}
                />
 
                <Text style={style.title_02}>Lastname</Text>
                <TextInput
                    style={style.input}
                    placeholder="Enter a Lastname"
                    onChangeText={(text) => { setLastname(text) }}
                    value={lastname}
                />
 
 
                <Text style={style.title_02}>Username</Text>
                <TextInput
                    style={style.input}
                    placeholder="Enter a Username"
                    onChangeText={(text) => { setUsername(text) }}
                    value={username}
                />
                <Text style={style.title_02}>Email</Text>
 
                <TextInput
                    style={style.input}
 
                    placeholder="Enter a Email"
                    onChangeText={(text) => { setEmail(text) }}
                    value={email}
                />
                <Text style={style.title_02}>Password</Text>
 
                <TextInput
                    style={style.input}
 
                    placeholder="Enter a Password"
                    secureTextEntry={true}
                    onChangeText={(text) => { setPassword(text) }}
                    value={password}
                />
                <Pressable style={style.btn_01}>
                    <Text style={{ color: "#000" }}>Sign Up</Text>
                </Pressable>
            </View>
 
 
        </View>
    )
 
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
        borderColor: theme.backgroundPanel
    },
    sub_header_title: {
        ...CS.Font.bold,
        paddingTop: 50,
        color: theme.primary,
        fontSize: 24,
        //letterSpacing: "0.24px",
        textAlign: "center"
    },
    title_02: {
        ...CS.Font.regular,
        color: theme.primary,
        display: "flex",
        fontSize: 14,
    },
    sub_container: {
        ...CS.Flex.column(16),
        justifyContent: "center",
        alignSelf: "stretch",
        padding: 20
    },
    input: {
        ...CS.Font.regular,
        width: "100%",
        height: 42,
        flexShrink: 0,
        backgroundColor:theme.backgroundCard,
        borderRadius: 9,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.backgroundPanel,
        color: theme.text,
        fontSize: 14,
        //letterSpacing: "0.14px",
        padding: 13,
    },
    btn_01: {
        ...CS.Font.bold,
        ...CS.Flex.centeredRow(),
        height: 40,
        justifyContent: "center",
        borderRadius: 12,
        backgroundColor:theme.primary,
        minwidth: "100%",
        marginTop:    20,
        marginBottom: 20
    }
})
)
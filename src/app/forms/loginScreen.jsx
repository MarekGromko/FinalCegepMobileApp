import { use, useState } from "react";
import { Text, View, TextInput, Pressable} from "react-native";
import { ThemedStyle, useThemedStyle } from "../../hook/useThemedStyle";

 
export default function LoginScreen(){

       const style = useThemedStyle(themedStyles);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    return(
        
       <View style={style.container}>
            <Text style={style.sub_header_title}> Login</Text>
            <View style={style.sub_container}>
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
                    <Text style={{ color: "#000" }}>Login</Text>
                </Pressable>
            </View>
 
 
        </View>
    )

}

const themedStyles = ThemedStyle((theme) => ({
        container: {
        width: "400px",
        height: "auto",
        backgroundColor: theme.blackBackground,
        alignSelf: "center",        
        marginTop: "auto",          
        marginBottom: "auto",
         borderRadius: "9px",
        border: "1px solide #D4D7E3",
        
    },
    sub_header_title: {
        paddingTop: "50px",
        color: theme.primary,
        fontFamily: "Roboto",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "100%",
        letterSpacing: "0.24px",
        textAlign:"center"
    },
    title_02: {
        color: theme.primary,
        display: "flex",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontStyle: "normal", 
    },
    sub_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "16px",
        alignSelf: "stretch",
        padding: "20px"
    },
    input: {
        width:"100%",
        height: "42px",
        flexShrink: 0,
        backgroundColor:theme.backgroundCard,
        borderRadius: "9px",
        border: "1px solide #D4D7E3",
        
        color:theme.text,
        fontFamily: "Roboto",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "100%",
        letterSpacing: "0.14px",
        padding: "13px",
    },
    btn_01: {
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        backgroundColor:theme.primary,
        minwidth:"100%",
        marginTop:"20px",
        marginBottom:"20px"
        
 
 
    }
})
)
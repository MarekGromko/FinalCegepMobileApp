import { 
    StyleSheet,
    TouchableOpacity, 
    View, 
    Text, 
    Alert,
    Image
} from "react-native";
import { useState, useContext } from "react";
import { ThemedStyle, useThemedStyle } from "@src/hook/useThemedStyle";
import { useUser } from "@src/hook/useUser";
import { CS } from "@src/style/CommonStyle";
import { useRouter } from "expo-router";
import { ThemeContext } from "@src/context/ThemeContext";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import * as NavigationBar from 'expo-navigation-bar';
import * as ImagePicker from 'expo-image-picker';

export default function Settings() {
    const ts = useThemedStyle(tsf);
    const { t } = useTranslation("settings");
    const user = useUser();
    const router = useRouter();
    const themeContext = useContext(ThemeContext);
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { 
                    text: "Logout", 
                    onPress: () => {
                        user.logOut();
                        router.replace("/login");
                    }, 
                    style: "destructive" 
                },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
    };

    const handleSignup = () => {
        router.push("/signUp");
    };

    const handleThemeChange = (theme) => {
        themeContext.setTheme(theme);
    };

    const handlePicChange = async () => {
        if(!(await ImagePicker.requestMediaLibraryPermissionsAsync()).granted) {
            Alert.alert("Permission denied", "We need permission to access your photo library to change your profile picture.");
            return;
        };
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        //I added this cause the Media Library was setting the android navigation bar back to normal, it rehides it.
        await NavigationBar.setVisibilityAsync("hidden");
        
        if (!result.canceled) {
            user.setUserPic(result.assets[0].uri);
        }
    }


    return (
        <View style={[ss.container, ts.container]}>
            {/* user info */}
            <View style={[ss.userPanel, ts.userPanel]}>
                <View>
                    <Text style={[ss.userTitle, ts.text]}>{t("settings:loggedInAs")}</Text>
                    <Text style={[ss.userName, ts.textBold]}>{user.userName || "Guest"}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handlePicChange}>
                        <Image source={{ uri: user.userPic || "default_image_uri" }} style={ss.userPic} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={ss.settingsSection}>
                <Text style={[ss.sectionTitle, ts.title]}>{t("settings:settings")}</Text>

                {/* langage */}
                <View style={[ss.settingItem, ts.settingItem]}>
                    <Text style={[ss.settingLabel, ts.text]}>{t("settings:language")}</Text>
                    <View style={ss.languageButtons}>
                        <TouchableOpacity 
                            style={[
                                ss.languageButton, 
                                currentLanguage === 'en' && ss.languageButtonActive,
                                ts.languageButton,
                                currentLanguage === 'en' && ts.languageButtonActive
                            ]}
                            onPress={() => handleLanguageChange('en')}
                        >
                            <Text style={[
                                ss.languageButtonText,
                                currentLanguage === 'en' && ss.languageButtonTextActive,
                                ts.languageButtonText,
                                currentLanguage === 'en' && ts.languageButtonTextActive
                            ]}>
                                English
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                ss.languageButton, 
                                currentLanguage === 'fr' && ss.languageButtonActive,
                                ts.languageButton,
                                currentLanguage === 'fr' && ts.languageButtonActive
                            ]}
                            onPress={() => handleLanguageChange('fr')}
                        >
                            <Text style={[
                                ss.languageButtonText,
                                currentLanguage === 'fr' && ss.languageButtonTextActive,
                                ts.languageButtonText,
                                currentLanguage === 'fr' && ts.languageButtonTextActive
                            ]}>
                                Français
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* theme */}
                <View style={[ss.settingItem, ts.settingItem]}>
                    <Text style={[ss.settingLabel, ts.text]}>Theme</Text>
                    <View style={ss.languageButtons}>
                        <TouchableOpacity 
                            style={[
                                ss.languageButton, 
                                themeContext.label === 'light' && ss.languageButtonActive,
                                ts.languageButton,
                                themeContext.label === 'light' && ts.languageButtonActive
                            ]}
                            onPress={() => handleThemeChange('light')}
                        >
                            <Text style={[
                                ss.languageButtonText,
                                themeContext.label === 'light' && ss.languageButtonTextActive,
                                ts.languageButtonText,
                                themeContext.label === 'light' && ts.languageButtonTextActive
                            ]}>
                                {t("settings:light")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                ss.languageButton, 
                                themeContext.label === 'dark' && ss.languageButtonActive,
                                ts.languageButton,
                                themeContext.label === 'dark' && ts.languageButtonActive
                            ]}
                            onPress={() => handleThemeChange('dark')}
                        >
                            <Text style={[
                                ss.languageButtonText,
                                themeContext.label === 'dark' && ss.languageButtonTextActive,
                                ts.languageButtonText,
                                themeContext.label === 'dark' && ts.languageButtonTextActive
                            ]}>
                                {t("settings:dark")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* sign up */}
                <TouchableOpacity 
                    style={[ss.settingItem, ss.settingButton, ts.settingItem]}
                    onPress={handleSignup}
                >
                    <Text style={[ss.settingLabel, ts.text]}>{t("settings:signup")}</Text>
                    <Text style={[ss.settingArrow, ts.textDim]}>→</Text>
                </TouchableOpacity>

                {/* login */}
                {user.isLogged && (
                    <TouchableOpacity 
                        style={[ss.settingItem, ss.settingButton, ts.settingItem]}
                        onPress={handleLogout}
                    >
                        <Text style={[ss.settingLabel, ts.textDanger]}>{t("settings:logout")}</Text>
                        <Text style={[ss.settingArrow, ts.textDanger]}>→</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const ss = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    userPanel: {
        ...CS.Flex.centeredRow(),
        justifyContent: "space-between",
        marginHorizontal: 16,
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
    },
    userTitle: {
        fontSize: 14,
        marginBottom: 8,
    },
    userName: {
        fontSize: 24,
        marginBottom: 4,
    },
    userPic: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#CCCCCC",
    },
    settingsSection: {
        flex: 1,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        ...CS.Font.bold,
        fontSize: 24,
        marginBottom: 16,
    },
    settingItem: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    settingButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
    },
    settingArrow: {
        fontSize: 20,
    },
    languageButtons: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 12,
    },
    languageButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    languageButtonActive: {
        borderWidth: 2,
    },
    languageButtonText: {
        fontSize: 14,
    },
    languageButtonTextActive: {
        ...CS.Font.bold,
    },
});

const tsf = ThemedStyle((theme) => ({
    container: {
        backgroundColor: theme.background,
    },
    userPanel: {
        backgroundColor: theme.backgroundPanel,
    },
    text: {
        color: theme.text,
    },
    textBold: {
        color: theme.text,
        ...CS.Font.bold,
    },
    textDim: {
        color: theme.textDim,
    },
    textDanger: {
        color: '#FF4444',
    },
    title: {
        color: theme.textDim,
    },
    settingItem: {
        backgroundColor: theme.backgroundPanel,
    },
    languageButton: {
        backgroundColor: theme.background,
        borderColor: theme.textDim,
    },
    languageButtonActive: {
        borderColor: theme.primary,
    },
    languageButtonText: {
        color: theme.text,
    },
    languageButtonTextActive: {
        color: theme.primary,
    },
}));
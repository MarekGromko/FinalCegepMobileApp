import React, { useContext } from 'react';
import { View ,TouchableOpacity,Image} from 'react-native';
import SearchbarComponent from '../components/SearchComponent';
import { useThemedStyle, ThemedStyle } from '../hook/useThemedStyle';
import dark from '../style/themes/dark.ts';
import light from '../style/themes/light.ts';
import { CS } from '../style/CommonStyle';

const stylesFactory = ThemedStyle((theme,label) => ({
    container: {
        flex: 1,
        backgroundColor: label === 'dark'? dark.background: light.background,
        ...CS.Flex.column(24),
        ...CS.padding(24),
    },
    headerRow: {
        ...CS.Flex.row(2),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchbarContainer: {
        flex: 1,
        marginRight: 10,
    },
    searchbar: {
        backgroundColor: label === 'dark'? dark.backgroundPanel:light.backgroundPanel,
        borderRadius: 24,
        ...CS.padding(2),
    },
    searchbarInput: {
        color: label === 'dark'?dark.text:light.text
    },
    
    
    
    settingIconColor: label === 'dark' ? dark.primary : light.primary,
    
    settingIcon: label === 'dark' ? require('../icons/search_settings_icon_dark.png') : require('../icons/search_settings_icon.png'),

    searchbarIconColor: label === 'dark'?dark.primary:'grey',
    searchbarPlaceHolder:  label === 'dark'?dark.text:light.text,

}));

export default function Search() {
    const searchBarStyles = useThemedStyle(stylesFactory);
    

    return (
        <View style={searchBarStyles.container}>
            <View style={searchBarStyles.headerRow}>
                <View style={searchBarStyles.searchbarContainer}>
                    <SearchbarComponent
                        style={searchBarStyles.searchbar}
                        inputStyle={searchBarStyles.searchbarInput}
                        iconColor={searchBarStyles.searchbarIconColor}
                        placeHolderColor={searchBarStyles.searchbarPlaceHolder}
                    />
                </View>
                <TouchableOpacity>
                    <Image 
                        source={searchBarStyles.settingIcon}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
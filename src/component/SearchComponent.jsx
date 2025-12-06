import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchbarComponent = ({
    style,
    inputStyle,
    iconColor,
    placeHolderColor,
    onSearchChange
}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearchChange = (text) => {
        setSearchQuery(text);
        if (onSearchChange) {
            onSearchChange(text);
        }
    };

    return (
        <Searchbar
            style={style}
            inputStyle={inputStyle}
            iconColor={iconColor}
            placeholder="Search currency :"
            placeholderTextColor={placeHolderColor}
            onChangeText={handleSearchChange}
            value={searchQuery}
        />
    );
};

export default SearchbarComponent;

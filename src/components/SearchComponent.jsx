import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchbarComponent = ({ style, inputStyle, iconColor,placeHolderColor }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
 

  return (
    <Searchbar
      style={style}
      inputStyle={ inputStyle}
      iconColor={iconColor}
      placeholder="Search currency :"
      placeholderTextColor={placeHolderColor}
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchbarComponent;

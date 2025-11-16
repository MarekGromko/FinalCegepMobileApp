import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchbarComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search currency"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchbarComponent;

import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';

import styles from './SearchBar.style';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search restaurants..."
        styles={styles.input}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: Config.API_KEY,
          language: 'en',
        }}
        fetchDetails
        enablePoweredByContainer={false}
      />
      <Icon name="search" size={35} color="#263238" style={styles.icon} />
    </View>
  );
};

export default SearchBar;

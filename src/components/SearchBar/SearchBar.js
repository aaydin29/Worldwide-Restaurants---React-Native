import React, {useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';

import RestaurantModal from '../modals/RestaurantModal/RestaurantModal';
import styles from './SearchBar.style';

const SearchBar = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        // This library automatically displays results that match the text the user enters into the input.
        placeholder="Search restaurants..."
        styles={styles.input}
        onPress={(data, details = null) => {
          setSelectedRestaurant(details);
        }}
        query={{
          key: Config.API_KEY,
          language: 'en',
        }}
        fetchDetails
        enablePoweredByContainer={false}
      />
      <Icon name="search" size={35} color="#263238" style={styles.icon} />
      <RestaurantModal
        isVisible={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        restaurant={selectedRestaurant}
      />
    </View>
  );
};

export default SearchBar;

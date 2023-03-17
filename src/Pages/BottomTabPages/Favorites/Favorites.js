import React from 'react';
import {View, Text} from 'react-native';

import styles from './Favorites.style';

const Favorites = () => {
  return (
    <View>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Favorites</Text>
      </View>
    </View>
  );
};

export default Favorites;

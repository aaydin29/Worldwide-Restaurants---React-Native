import React from 'react';
import {View, Text, Image} from 'react-native';
import Modal from 'react-native-modal';
import Config from 'react-native-config';

import styles from './RestaurantModal.style';

const RestaurantModal = ({isVisible, onClose, restaurant}) => {
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${Config.API_KEY}`;

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <Image source={{uri: photoUrl}} style={styles.image} />
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.rating}>{restaurant.rating}</Text>
      </View>
    </Modal>
  );
};

export default RestaurantModal;

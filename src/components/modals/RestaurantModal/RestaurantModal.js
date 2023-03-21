import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AirbnbRating} from 'react-native-ratings';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';

import styles from './RestaurantModal.style';
import AuthModal from '../AuthModal/AuthModal';

const RestaurantModal = ({isVisible, onClose, restaurant}) => {
  const [authVisible, setAuthVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  if (!restaurant || !restaurant.photos || restaurant.photos.length === 0) {
    return null;
  }

  const iconUrl = restaurant.icon;
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${Config.API_KEY}`;

  function handleAddFavorites() {
    const user = auth().currentUser;
    if (!user) {
      // If the user is not logged in, an error message will appear on the screen that they cannot add to favorites and show AuthModal.
      showMessage({
        message: 'Please login to add to favorites!',
        type: 'danger',
        floating: true,
      });
      setAuthVisible(true);
      return;
    }

    const userId = auth().currentUser.uid;
    const restaurantData = {
      name: restaurant.name,
      address: restaurant.formatted_address,
      rating: restaurant.rating,
      photoUrl: photoUrl,
      opening_hours: restaurant.opening_hours.open_now,
      icon: iconUrl,
      ratingTotal: restaurant.user_ratings_total,
    };

    const favoriteRef = database().ref(`users/${userId}/favorites`);
    favoriteRef.once('value', snapshot => {
      const favorites = snapshot.val();
      for (let key in favorites) {
        if (
          // It checks that the same restaurant is not added twice.
          favorites[key].name === restaurant.name &&
          favorites[key].address === restaurant.formatted_address
        ) {
          showMessage({
            message: 'This restaurant is already in favorites!',
            type: 'warning',
            floating: true,
          });
          return;
        }
      }

      const newRef = favoriteRef.push();
      // It sends the selected restaurant to the database as a favourite.
      newRef
        .set(restaurantData)
        .then(() => {
          setIsFavorite(true);
          showMessage({
            message: 'Successfully added to Favorites!',
            type: 'success',
            floating: true,
          });
        })
        .catch(error =>
          showMessage({
            message: 'Something went wrong!',
            type: 'danger',
            floating: true,
          }),
        );
    });
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <Image source={{uri: photoUrl}} style={styles.image} />
          <View style={styles.top_info_container}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <View style={styles.status_container}>
              <Text
                style={[
                  styles.status_circle,
                  restaurant.opening_hours.open_now &&
                    styles.status_circle_green,
                  !restaurant.opening_hours.open_now &&
                    styles.status_circle_orange,
                ]}>
                {' '}
              </Text>
              <Text style={styles.status_text}>
                {restaurant.opening_hours.open_now ? 'Open Now' : 'Closed'}
              </Text>
              <Image source={{uri: iconUrl}} style={styles.restaurant_icon} />
            </View>
            <View style={styles.rating_container}>
              <AirbnbRating
                starContainerStyle={styles.rating_stars}
                count={5}
                showRating={false}
                defaultRating={restaurant.rating}
                size={20}
                unSelectedColor="#BDC3C7"
              />

              <Text style={styles.rating_text}>
                {restaurant.rating} ({restaurant.user_ratings_total})
              </Text>
            </View>
            <Text style={styles.address}>
              Address: {restaurant.formatted_address}
            </Text>
          </View>
          <TouchableOpacity>
            <Icon
              name="heart"
              size={30}
              color={isFavorite ? 'orange' : 'gray'}
              onPress={handleAddFavorites}
            />
          </TouchableOpacity>
        </View>
      </View>
      <AuthModal
        isVisible={authVisible}
        onClose={() => setAuthVisible(false)}
      />
    </Modal>
  );
};

export default RestaurantModal;

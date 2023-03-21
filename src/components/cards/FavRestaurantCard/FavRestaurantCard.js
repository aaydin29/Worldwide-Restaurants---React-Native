import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AirbnbRating} from 'react-native-ratings';
import {showMessage} from 'react-native-flash-message';

import styles from './FavRestaurantCard.style';

const FavRestaurantCard = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  const toggleShowMore = index => {
    const updatedRestaurants = [...restaurantData];
    updatedRestaurants[index].showMore = !updatedRestaurants[index].showMore;
    setRestaurantData(updatedRestaurants);
  };

  function handleRemoveFavorites(index) {
    const userId = auth().currentUser.uid;
    const restaurant = restaurantData[index];
    const restaurantRef = database().ref(
      `users/${userId}/favorites/${restaurant.index}`,
    );
    restaurantRef
      .remove()
      .then(() => {
        const updatedRestaurants = restaurantData.filter((_, i) => i !== index);
        setRestaurantData(updatedRestaurants);
      })
      .catch(error => {
        showMessage({
          message: 'Something went wrong!',
          type: 'danger',
          floating: true,
        });
      });
  }

  useEffect(() => {
    // It pulls to favorites data from database and set to state.
    const userId = auth().currentUser.uid;
    const favoritesRef = database().ref(`users/${userId}/favorites`);
    favoritesRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const restaurants = Object.values(data).map(rest => ({
          ...rest,
          showMore: false,
        }));
        setRestaurantData(restaurants);
      }
    });
    return () => {
      favoritesRef.off();
    };
  }, []);

  return (
    <View>
      {restaurantData &&
        restaurantData.map((restaurant, index) => (
          <View style={styles.container} key={restaurant.name}>
            <View style={styles.info_container}>
              <Image style={styles.image} source={{uri: restaurant.photoUrl}} />
              <View style={styles.name_rating_container}>
                <Text style={styles.name}>{restaurant.name}</Text>
                <View style={styles.rating_container}>
                  <AirbnbRating
                    starContainerStyle={styles.rating_stars}
                    count={5}
                    showRating={false}
                    defaultRating={restaurant.rating}
                    size={20}
                    unSelectedColor="#BDC3C7"
                  />
                  <Text style={styles.rating}>
                    {restaurant.rating} ({restaurant.ratingTotal})
                  </Text>
                </View>
                <TouchableOpacity onPress={() => toggleShowMore(index)}>
                  <Text style={styles.button_text}>Show more</Text>
                </TouchableOpacity>
              </View>
              <Icon
                name="remove"
                color="red"
                size={25}
                style={styles.remove_icon}
                onPress={() => handleRemoveFavorites(index)}
              />
            </View>
            {restaurant.showMore && (
              <>
                <View style={styles.more_info_container}>
                  <View style={styles.openHour_icon_container}>
                    <Image
                      source={{uri: restaurant.icon}}
                      style={styles.restaurant_icon}
                    />
                    <Text
                      style={[
                        styles.status_circle,
                        restaurant.opening_hours && styles.status_circle_green,
                        !restaurant.opening_hours &&
                          styles.status_circle_orange,
                      ]}>
                      {' '}
                    </Text>
                    <Text>
                      {restaurant.opening_hours ? 'Open now' : 'Closed'}
                    </Text>
                  </View>
                  <Text style={styles.address}>
                    Adress: {restaurant.address}
                  </Text>
                </View>
              </>
            )}
          </View>
        ))}
    </View>
  );
};

export default FavRestaurantCard;
